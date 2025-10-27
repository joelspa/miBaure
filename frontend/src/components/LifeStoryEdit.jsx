import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import TagInput from './ui/TagInput';
import ImageDropzone from './ui/ImageDropzone';
import Loading from './Loading';
import { useAuth } from '../hooks/useAuth';
import { validateLifeStoryField, validateLifeStoryForm } from '../schemas/lifeStorySchema';

export default function LifeStoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  
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
  const [currentImage, setCurrentImage] = useState(null);

  // Estado UI
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchLifeStory = async () => {
      try {
        const res = await apiService.getLifeStoryById(id);
        const ls = res.data;
        
        setTitle(ls.title || '');
        setPersonName(ls.personName || '');
        setAge(ls.age || '');
        setCommunity(ls.community || '');
        setStory(ls.story || '');
        setRelatedThemes(ls.relatedThemes || []);
        setRecordedBy(ls.recordedBy || '');
        setCurrentImage(ls.imageUrl || null);
        
        // Convertir fecha ISO a formato YYYY-MM-DD para el input date
        if (ls.recordedDate) {
          const date = new Date(ls.recordedDate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          setRecordedDate(`${year}-${month}-${day}`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setToast({ type: 'error', text: 'No se pudo cargar el recuento' });
        setLoading(false);
      }
    };

    fetchLifeStory();
  }, [id]);

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
        const iso = new Date(recordedDate).toISOString();
        fd.append('recordedDate', iso);
      }
      if (recordedBy) fd.append('recordedBy', recordedBy);
      if (mainFile) fd.append('image', mainFile);

      await apiService.updateLifeStory(id, fd, evt => {
        if (!evt.total) return;
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      });

      setToast({ type: 'success', text: 'Recuento actualizado con éxito' });
      setTimeout(() => navigate(`/recuentos`), 1500);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo actualizar el recuento' });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper">
      <div className="page-container">
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon">edit</span>
          <h1 className="page-title">Editar recuento de vida</h1>
          <p className="page-description">Actualiza la información del recuento.</p>
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
                currentImage={currentImage}
              />

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
              {submitting ? 'Guardando…' : 'Actualizar recuento'}
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
