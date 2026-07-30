import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/api.service';
import Loading from './Loading';
import ConfirmModal from './ui/ConfirmModal';
import { useToast } from '../hooks/useToast';
import { ERROR_MESSAGES, LOADING_MESSAGES, CULTURAL_CATEGORIES } from '../config/constants';

function CulturalArticle({ item, isAdmin, onDelete }) {
  const [open, setOpen] = useState(true); // start expanded

  return (
    <article className="cultural-article">
      {/* Collapsible header */}
      <div className="cultural-header">
        <span className="cultural-category">{item.category}</span>

        <button
          className="cultural-article-toggle"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls={`article-body-${item._id}`}
        >
          <h2 className="cultural-title">{item.title}</h2>
          <span
            className="material-symbols-outlined toggle-icon"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>
      </div>

      <div
        id={`article-body-${item._id}`}
        className={`cultural-article-body${open ? '' : ' collapsed'}`}
      >
        {/* Main content */}
        <div className="cultural-main-content">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>

        {/* Subsections */}
        {item.subsections?.length > 0 && (
          <div className="cultural-subsections">
            {item.subsections.map((sub, i) => (
              <div key={i} className="subsection">
                <h3 className="subsection-title">{sub.subtitle}</h3>
                <p className="subsection-text">{sub.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Images */}
        {item.images?.length > 0 && (
          <div className="cultural-images">
            {item.images.map((img, i) => (
              <figure key={i} className="cultural-image">
                <img
                  src={img.url}
                  alt={img.caption || `Imagen ilustrativa de ${item.title}, categoría ${item.category} — cultura Baure`}
                  loading="lazy"
                  width="600"
                  height="400"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {/* Related topics */}
        {item.relatedTopics?.length > 0 && (
          <div className="cultural-topics">
            <span className="topics-label">Temas relacionados:</span>
            {item.relatedTopics.map((topic, i) => (
              <span key={i} className="tag tag-accent">{topic}</span>
            ))}
          </div>
        )}

        {/* Admin actions */}
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link
              to={`/cultura/${item._id}/edit`}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">edit</span>
              Editar
            </Link>
            <button
              onClick={() => onDelete(item)}
              className="btn btn-outline"
              style={{ flex: 1, color: 'var(--color-error, #dc2626)' }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">delete</span>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function BaureCulture() {
  const [culturalData, setCulturalData]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [confirmTarget, setConfirmTarget] = useState(null);
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  const toast   = useToast();

  useEffect(() => {
    apiService.getAllCulturalData()
      .then(res  => { setCulturalData(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError(ERROR_MESSAGES.LOAD_CULTURAL); setLoading(false); });
  }, []);

  const filteredData = selectedCategory === 'all'
    ? culturalData
    : culturalData.filter(item => item.category === selectedCategory);

  const handleDeleteRequest = (item) => setConfirmTarget(item);
  const handleDeleteCancel  = () => setConfirmTarget(null);

  const handleDeleteConfirm = async () => {
    const item = confirmTarget;
    setConfirmTarget(null);
    try {
      await apiService.deleteCulturalData(item._id);
      setCulturalData(prev => prev.filter(d => d._id !== item._id));
      toast.success('Dato cultural eliminado con éxito.');
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="content-wrapper">
      <div className="page-container">
        {/* Page header */}
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon" aria-hidden="true">account_balance</span>
          <h1 className="page-title">Cultura Baure</h1>
          <p className="page-description">
            Datos históricos, tradiciones y conocimientos de la cultura Baure
          </p>
        </div>

        {/* Category filters — horizontal scroll on mobile */}
        <div className="category-filters" role="group" aria-label="Filtrar por categoría cultural">
          {CULTURAL_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={selectedCategory === cat.value ? 'tag tag-primary' : 'tag'}
              onClick={() => setSelectedCategory(cat.value)}
              aria-pressed={selectedCategory === cat.value}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="culture-content">
          {loading ? (
            <Loading message={LOADING_MESSAGES.CULTURAL} />
          ) : error ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <span className="material-symbols-outlined">error</span>
              </div>
              <h3 className="empty-state-title">Error al cargar</h3>
              <p className="empty-state-desc">{error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                <span className="material-symbols-outlined">refresh</span>
                Reintentar
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <h3 className="empty-state-title">No hay contenido en esta categoría</h3>
              <p className="empty-state-desc">
                Seleccioná otra categoría o volvé más adelante.
              </p>
              {selectedCategory !== 'all' && (
                <button className="btn btn-outline" onClick={() => setSelectedCategory('all')}>
                  Ver todo
                </button>
              )}
            </div>
          ) : (
            <div className="cultural-articles">
              {filteredData.map(item => (
                <CulturalArticle
                  key={item._id}
                  item={item}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteRequest}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirm delete modal */}
      <ConfirmModal
        open={!!confirmTarget}
        title="¿Eliminar dato cultural?"
        message={confirmTarget ? `Se eliminará "${confirmTarget.title}". Esta acción no se puede deshacer.` : ''}
        confirmText="Eliminar"
        cancelText="Cancelar"
        danger
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
