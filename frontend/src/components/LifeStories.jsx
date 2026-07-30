import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import { SkeletonStoriesGrid } from './ui/SkeletonCard';
import ConfirmModal from './ui/ConfirmModal';
import { useToast } from '../hooks/useToast';
import { ERROR_MESSAGES, LOADING_MESSAGES } from '../config/constants';

function StoryCard({ story, isAdmin, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = story.story && story.story.length > 300;

  return (
    <article className="story-card">
      {story.photoUrl && (
        <div className="story-image">
          <img
            src={story.photoUrl}
            alt={`Retrato de ${story.personName}${story.community ? `, comunidad ${story.community}` : ''}, narrador del pueblo Baure`}
            loading="lazy"
            width="400"
            height="300"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="story-content">
        <h2 className="story-title">{story.title}</h2>

        {/* Metadata */}
        <div className="story-meta">
          <span className="material-symbols-outlined" aria-hidden="true">person</span>
          <span className="story-person">
            {story.personName}{story.age && `, ${story.age} años`}
          </span>
        </div>
        {story.community && (
          <div className="story-meta">
            <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
            <span>{story.community}</span>
          </div>
        )}

        {/* Expandable text */}
        {story.story && (
          <>
            <p className={`story-text-preview${expanded ? ' expanded' : ''}`}>
              {story.story}
            </p>
            {isLong && (
              <button
                className={`story-expand-btn${expanded ? ' expanded' : ''}`}
                onClick={() => setExpanded(v => !v)}
                aria-expanded={expanded}
              >
                {expanded ? 'Leer menos' : 'Leer más'}
                <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
              </button>
            )}
          </>
        )}

        {/* Tags */}
        {story.relatedThemes?.length > 0 && (
          <div className="story-themes">
            {story.relatedThemes.map((theme, i) => (
              <span key={i} className="tag tag-secondary">{theme}</span>
            ))}
          </div>
        )}

        {/* Admin actions */}
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link
              to={`/recuentos/${story._id}/edit`}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">edit</span>
              Editar
            </Link>
            <button
              onClick={() => onDelete(story)}
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

export default function LifeStories() {
  const [stories, setStories]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  const toast = useToast();

  useEffect(() => {
    apiService.getAllStories()
      .then(res  => { setStories(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError(ERROR_MESSAGES.LOAD_STORIES); setLoading(false); });
  }, []);

  const handleDeleteRequest = (story) => setConfirmTarget(story);
  const handleDeleteCancel  = () => setConfirmTarget(null);

  const handleDeleteConfirm = async () => {
    const story = confirmTarget;
    setConfirmTarget(null);
    try {
      await apiService.deleteLifeStory(story._id);
      setStories(prev => prev.filter(s => s._id !== story._id));
      toast.success('Recuento eliminado con éxito.');
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
          <span className="material-symbols-outlined hero-icon" aria-hidden="true">history_edu</span>
          <h1 className="page-title">Recuentos de Vida</h1>
          <p className="page-description">
            Historias y testimonios de la comunidad Baure
          </p>
        </div>

        {/* Content */}
        <div className="stories-content">
          {loading ? (
            <SkeletonStoriesGrid count={4} />
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
          ) : stories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <span className="material-symbols-outlined">history_edu</span>
              </div>
              <h3 className="empty-state-title">Aún no hay recuentos</h3>
              <p className="empty-state-desc">
                Los testimonios de la comunidad Baure aparecerán aquí cuando sean publicados.
              </p>
              {isAdmin && (
                <Link to="/recuentos/crear" className="btn btn-primary">
                  <span className="material-symbols-outlined">add</span>
                  Agregar recuento
                </Link>
              )}
            </div>
          ) : (
            <div className="stories-grid">
              {stories.map(story => (
                <StoryCard
                  key={story._id}
                  story={story}
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
        title="¿Eliminar recuento?"
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
