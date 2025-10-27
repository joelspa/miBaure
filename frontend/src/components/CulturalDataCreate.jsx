// src/components/CulturalDataCreate.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import TagInput from './ui/TagInput';
import ImageDropzone from './ui/ImageDropzone';
import Loading from './Loading';
import { useAuth } from '../hooks/useAuth';
import { validateCulturalDataField, validateCulturalDataForm } from '../schemas/culturalDataSchema';

function CulturalDataCreate() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Campos
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Historia');
  const [content, setContent] = useState('');
  const [sources, setSources] = useState([]);
  const [relatedTopics, setRelatedTopics] = useState([]);

  // Imagen
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Estado UI
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const categories = [
    'Historia',
    'Tradiciones',
    'Lengua',
    'Cosmovisión',
    'Territorio',
    'Organización Social',
    'Cocina',
    'Otro'
  ];

  // Validación en tiempo real con Zod
  const validateField = (field, value) => {
    const error = validateCulturalDataField(field, value);
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
      category: category.trim(),
      content: content.trim(),
      source: sources.join(', '),
      tags: relatedTopics,
    };

    const { isValid, errors: validationErrors } = validateCulturalDataForm(formData);
    setErrors(validationErrors);
    return isValid;
  };

  // Verificar si el formulario es válido (solo para deshabilitar botón)
  const isFormValid = () => {
    // Solo verificar que los campos obligatorios no estén completamente vacíos
    return title.trim() && category.trim() && content.trim();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setToast(null);

      const fd = new FormData();
      fd.append('title', title);
      fd.append('category', category);
      fd.append('content', content);
      fd.append('sources', JSON.stringify(sources));
      fd.append('relatedTopics', JSON.stringify(relatedTopics));
      
      if (file) {
        fd.append('image', file);
      }

      await apiService.createCulturalData(fd, evt => {
        if (!evt.total) return;
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      });

      setToast({ type: 'success', text: 'Dato cultural creado con éxito' });
      setTimeout(() => navigate('/cultura'), 1500);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo crear el dato cultural' });
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
          <h1 className="page-title">Crear dato cultural</h1>
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
                  onChange={(e) => {
                    setTitle(e.target.value);
                    validateField('title', e.target.value);
                  }}
                  onBlur={(e) => validateField('title', e.target.value)}
                  placeholder="El río Iténez en la cosmovisión Baure (5-150 caracteres)"
                  autoComplete="off"
                />
                {errors.title && <p className="error">{errors.title}</p>}
                <small className="field-hint">
                  {title.length}/150 caracteres
                </small>
              </div>

              <div className="field">
                <label className="label">Categoría *</label>
                <select
                  className={`input ${errors.category ? 'input-error' : ''}`}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    validateField('category', e.target.value);
                  }}
                  onBlur={(e) => validateField('category', e.target.value)}
                  autoComplete="off"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="error">{errors.category}</p>}
              </div>

              <TagInput
                label="Fuentes"
                placeholder="Ej. Relato de María López, 2024"
                values={sources}
                onChange={setSources}
              />

              <TagInput
                label="Temas relacionados"
                placeholder="Ej. Pesca"
                values={relatedTopics}
                onChange={setRelatedTopics}
              />
            </div>

            <div>
              <ImageDropzone
                label="Imagen principal"
                onFileSelected={setFile}
                preview={preview}
                setPreview={setPreview}
              />

              <div className="field">
                <label className="label">Contenido *</label>
                <textarea
                  className={`textarea ${errors.content ? 'input-error' : ''}`}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    validateField('content', e.target.value);
                  }}
                  onBlur={(e) => validateField('content', e.target.value)}
                  rows={10}
                  placeholder="Describe el dato cultural… (mínimo 20 caracteres)"
                  autoComplete="off"
                />
                {errors.content && <p className="error">{errors.content}</p>}
                <small className="field-hint">
                  {content.length}/3000 caracteres
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
              {submitting ? 'Guardando…' : 'Crear dato cultural'}
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

export default CulturalDataCreate;
