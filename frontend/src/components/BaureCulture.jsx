import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/api.service';
import Loading from './Loading';
import ConfirmModal from './ui/ConfirmModal';
import { useToast } from '../hooks/useToast';
import { ERROR_MESSAGES, LOADING_MESSAGES, CULTURAL_CATEGORIES } from '../config/constants';

function CulturalArticle({ item, isAdmin, onDelete }) {
  const [open, setOpen] = useState(true);

  return (
    <article className="museum-card glass">
      <div className="museum-header" onClick={() => setOpen(v => !v)} style={{ cursor: 'pointer' }}>
        <div className="museum-meta">
          <span className="chip chip-primary">{item.category}</span>
          <h2 className="museum-title">{item.title}</h2>
        </div>
        <button
          className="btn-icon"
          aria-expanded={open}
          aria-controls={`article-body-${item._id}`}
          onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        >
          <span
            className="material-symbols-outlined"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>
      </div>

      <div
        id={`article-body-${item._id}`}
        className={`museum-body ${open ? 'open' : 'collapsed'}`}
      >
        <div className="museum-content">
          <div className="cultural-main-content">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>

          {item.subsections?.length > 0 && (
            <div className="museum-subsections">
              {item.subsections.map((sub, i) => (
                <div key={i} className="museum-subsection">
                  <h3 className="museum-subtitle">{sub.subtitle}</h3>
                  <p>{sub.text}</p>
                </div>
              ))}
            </div>
          )}

          {item.images?.length > 0 && (
            <div className="museum-gallery">
              {item.images.map((img, i) => (
                <figure key={i} className="museum-figure">
                  <img
                    src={img.url}
                    alt={img.caption || `Imagen ilustrativa de ${item.title}`}
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  {img.caption && <figcaption className="museum-caption">{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {item.relatedTopics?.length > 0 && (
            <div className="museum-topics">
              <span className="topics-label">Temas relacionados:</span>
              <div className="topics-list">
                {item.relatedTopics.map((topic, i) => (
                  <span key={i} className="chip chip-secondary">{topic}</span>
                ))}
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="museum-admin-actions">
              <Link to={`/cultura/${item._id}/edit`} className="btn btn-outline">
                <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                Editar
              </Link>
              <button
                onClick={() => onDelete(item)}
                className="btn btn-outline"
                style={{ color: 'var(--color-error)' }}
              >
                <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                Eliminar
              </button>
            </div>
          )}
        </div>
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
    <div className="content-wrapper animate-in">
      <div className="page-container museum-layout">
        <div className="museum-page-header">
          <p className="hero-eyebrow" style={{ color: 'var(--color-primary)' }}>
            <span className="material-symbols-outlined" aria-hidden="true">account_balance</span>
            Patrimonio Vivo
          </p>
          <h1 className="museum-page-title">Cultura Baure</h1>
          <p className="museum-page-desc">
            Explorá la sabiduría ancestral, la historia y la identidad viva del pueblo Baure.
          </p>
        </div>

        <div className="filters-container" role="group" aria-label="Filtrar por categoría cultural">
          <ul className="filters-list">
            {CULTURAL_CATEGORIES.map(cat => (
              <li key={cat.value}>
                <button
                  className={selectedCategory === cat.value ? 'chip chip-primary' : 'chip chip-secondary'}
                  onClick={() => setSelectedCategory(cat.value)}
                  aria-pressed={selectedCategory === cat.value}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }} aria-hidden="true">
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="culture-content">
          {loading ? (
            <Loading message={LOADING_MESSAGES.CULTURAL} />
          ) : error ? (
            <div className="empty-state glass">
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
            <div className="empty-state glass">
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
            <div className="museum-articles">
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
