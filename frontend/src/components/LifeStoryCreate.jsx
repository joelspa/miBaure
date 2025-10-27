import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import TagInput from './ui/TagInput';
import ImageDropzone from './ui/ImageDropzone';
import Loading from './Loading';
import { useAuth } from '../hooks/useAuth';
import { validateLifeStoryField, validateLifeStoryForm } from '../schemas/lifeStorySchema';

function MultiImagePicker({ onFilesSelected }) {
  const [list, setList] = useState([]);

  const onChange = (e) => {
    const files = Array.from(e.target.files || []);
    setList(files);
    onFilesSelected(files);
  };

  return (
    <div className="field">
      <label className="label">Fotos adicionales</label>
      <input
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        onChange={onChange}
      />
      {list.length > 0 && (
        <p className="hint">{list.length} imagen{list.length > 1 ? 'es' : ''} seleccionada{list.length > 1 ? 's' : ''}</p>
      )}
    </div>
  );
}

export default function LifeStoryCreate() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Campos
  const [title, setTitle] = useState('');
  const [personName, setPersonName] = useState('');
  const [age, setAge] = useState('');
  const [community, setCommunity] = useState('');
  const [story, setStory] = useState('');
  const [relatedThemes, setRelatedThemes] = useState([]);
  const [recordedDate, setRecordedDate] = useState('');
  const [recordedBy, setRecordedBy] = useState('');

  // Imágenes
  const [mainFile, setMainFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extraFiles, setExtraFiles] = useState([]);

  // Estado UI
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  // Validación en tiempo real con Zod
  const validateField = (field, value) => {
    const error = validateLifeStoryField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validate = () => {
    const formData = {
      title: title.trim(),
      personName: personName.trim(),
      story: story.trim(),
      community: community.trim(),
      age: age.trim(),
      date: recordedDate,
      tags: relatedThemes,
    };

    const { isValid, errors: validationErrors } = validateLifeStoryForm(formData);
    setErrors(validationErrors);
    return isValid;
  };

  // Verificar si el formulario es válido (solo para deshabilitar botón)
  const isFormValid = () => {
    // Solo verificar que los campos obligatorios no estén completamente vacíos
    return title.trim() && personName.trim() && story.trim();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setToast(null);

      const fd = new FormData();
      fd.append('title', title);
      fd.append('personName', personName);
      if (age) fd.append('age', age);
      if (community) fd.append('community', community);
      fd.append('story', story);
      relatedThemes.forEach(t => fd.append('relatedThemes', t));
      if (recordedDate) {
        // HTML date -> ISO a medianoche local
        const iso = new Date(recordedDate).toISOString();
        fd.append('recordedDate', iso);
      }
      if (recordedBy) fd.append('recordedBy', recordedBy);
      if (mainFile) fd.append('image', mainFile);

      const res = await apiService.createLifeStory(fd, evt => {
        if (!evt.total) return;
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      });

      // Subir extras si hay
      if (extraFiles.length > 0) {
        const fdExtras = new FormData();
        extraFiles.forEach(f => fdExtras.append('images', f));
        await apiService.addLifeStoryImages(res.data._id, fdExtras);
      }

      setToast({ type: 'success', text: 'Recuento creado con éxito' });
      navigate(`/recuentos`);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo crear el recuento' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Mostrar loading mientras verifica autenticación
  if (authLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // Si no está autenticado, useAuth ya redirigió a /admin
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="content-wrapper">
      <div className="page-container">
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon">add_circle</span>
          <h1 className="page-title">Crear recuento de vida</h1>
          <p className="page-description">Completa el formulario y sube una imagen principal.</p>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <div className="grid-2">
            <div>
              <div className="field">
                <label className="label">Título *</label>
                <input
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    validateField('title', e.target.value);
                  }}
                  onBlur={e => validateField('title', e.target.value)}
                  placeholder="La pesca en el Iténez (5-150 caracteres)"
                  autoComplete="off"
                />
                {errors.title && <p className="error">{errors.title}</p>}
                <small className="field-hint">
                  {title.length}/150 caracteres
                </small>
              </div>

              <div className="field">
                <label className="label">Nombre de la persona *</label>
                <input
                  className={`input ${errors.personName ? 'input-error' : ''}`}
                  value={personName}
                  onChange={e => {
                    setPersonName(e.target.value);
                    validateField('personName', e.target.value);
                  }}
                  onBlur={e => validateField('personName', e.target.value)}
                  placeholder="Adil Arredondo (2-100 caracteres)"
                  autoComplete="off"
                />
                {errors.personName && <p className="error">{errors.personName}</p>}
                <small className="field-hint">
                  {personName.length}/100 caracteres
                </small>
              </div>

              <div className="field">
                <label className="label">Edad</label>
                <input
                  className={`input ${errors.age ? 'input-error' : ''}`}
                  type="number"
                  min="0"
                  max="120"
                  value={age}
                  onChange={e => {
                    setAge(e.target.value);
                    validateField('age', e.target.value);
                  }}
                  onBlur={e => validateField('age', e.target.value)}
                  placeholder="54 (1-120)"
                  autoComplete="off"
                />
                {errors.age && <p className="error">{errors.age}</p>}
              </div>

              <div className="field">
                <label className="label">Comunidad</label>
                <input
                  className={`input ${errors.community ? 'input-error' : ''}`}
                  value={community}
                  onChange={e => {
                    setCommunity(e.target.value);
                    validateField('community', e.target.value);
                  }}
                  onBlur={e => validateField('community', e.target.value)}
                  placeholder="Baures (2-100 caracteres)"
                  autoComplete="off"
                />
                {errors.community && <p className="error">{errors.community}</p>}
                <small className="field-hint">
                  {community.length}/100 caracteres
                </small>
              </div>

              <TagInput
                label="Temas relacionados"
                placeholder="Ej. Río"
                values={relatedThemes}
                onChange={setRelatedThemes}
              />
            </div>

            <div>
              <ImageDropzone
                label="Imagen principal"
                onFileSelected={setMainFile}
                preview={preview}
                setPreview={setPreview}
              />

              <MultiImagePicker onFilesSelected={setExtraFiles} />

              <div className="field">
                <label className="label">Fecha del relato</label>
                <input
                  type="date"
                  className="input"
                  value={recordedDate}
                  onChange={e => setRecordedDate(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label className="label">Registrado por</label>
                <input
                  className="input"
                  value={recordedBy}
                  onChange={e => setRecordedBy(e.target.value)}
                  placeholder="Equipo de campo"
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label className="label">Relato *</label>
                <textarea
                  className={`textarea ${errors.story ? 'input-error' : ''}`}
                  rows={8}
                  value={story}
                  onChange={e => {
                    setStory(e.target.value);
                    validateField('story', e.target.value);
                  }}
                  onBlur={e => validateField('story', e.target.value)}
                  placeholder="Cuenta la historia de vida… (mínimo 50 caracteres)"
                  autoComplete="off"
                />
                {errors.story && <p className="error">{errors.story}</p>}
                <small className="field-hint">
                  {story.length}/5000 caracteres
                </small>
              </div>
            </div>
          </div>

          {submitting && (
            <div className="progress">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting || !isFormValid()}
            >
              <span className="material-symbols-outlined">save</span>
              {submitting ? 'Guardando…' : 'Crear recuento'}
            </button>
          </div>

          {toast && (
            <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              <span className="material-symbols-outlined">
                {toast.type === 'error' ? 'error' : 'check_circle'}
              </span>
              {toast.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
