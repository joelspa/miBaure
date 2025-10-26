import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import ChipInput from './ui/ChipInput';
import ImageDropzone from './ui/ImageDropzone';
import Loading from './Loading';

function CulturalDataEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // Campos
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Historia');
  const [content, setContent] = useState('');
  const [sources, setSources] = useState([]);
  const [relatedTopics, setRelatedTopics] = useState([]);

  // Imagen
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

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

  useEffect(() => {
    const fetchCulturalData = async () => {
      try {
        const res = await apiService.getCulturalDataById(id);
        const cd = res.data;
        
        setTitle(cd.title || '');
        setCategory(cd.category || 'Historia');
        setContent(cd.content || '');
        setSources(cd.sources || []);
        setRelatedTopics(cd.relatedTopics || []);
        setCurrentImage(cd.imageUrl || null);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setToast({ type: 'error', text: 'No se pudo cargar el dato cultural' });
        setLoading(false);
      }
    };

    fetchCulturalData();
  }, [id]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'El título es obligatorio.';
    if (!content.trim()) e.content = 'El contenido es obligatorio.';
    setErrors(e);
    return Object.keys(e).length === 0;
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

      await apiService.updateCulturalData(id, fd, evt => {
        if (!evt.total) return;
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      });

      setToast({ type: 'success', text: 'Dato cultural actualizado con éxito' });
      setTimeout(() => navigate('/cultura'), 1500);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo actualizar el dato cultural' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper">
      <div className="page-container">
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon">edit</span>
          <h1 className="page-title">Editar dato cultural</h1>
          <p className="page-description">Actualiza la información del dato cultural.</p>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <div className="grid-2">
            <div>
              <div className="field">
                <label className="label">Título *</label>
                <input
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="El río Iténez en la cosmovisión Baure"
                />
                {errors.title && <p className="error">{errors.title}</p>}
              </div>

              <div className="field">
                <label className="label">Categoría *</label>
                <select
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <ChipInput
                label="Fuentes"
                placeholder="Ej. Relato de María López, 2024"
                values={sources}
                onChange={setSources}
              />

              <ChipInput
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
                currentImage={currentImage}
              />

              <div className="field">
                <label className="label">Contenido *</label>
                <textarea
                  className={`textarea ${errors.content ? 'input-error' : ''}`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Describe la información cultural de forma detallada…"
                />
                {errors.content && <p className="error">{errors.content}</p>}
              </div>
            </div>
          </div>

          {submitting && (
            <div className="progress">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/cultura')}>
              <span className="material-symbols-outlined">arrow_back</span>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <span className="material-symbols-outlined">save</span>
              {submitting ? 'Guardando…' : 'Guardar cambios'}
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

export default CulturalDataEdit;
