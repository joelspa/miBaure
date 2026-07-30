import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import Loading from './Loading';
import ChatSection from './ChatSection';
import ConfirmModal from './ui/ConfirmModal';
import { useToast } from '../hooks/useToast';
import { ERROR_MESSAGES, LOADING_MESSAGES } from '../config/constants';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  const toast = useToast();

  useEffect(() => {
    apiService.getRecipeById(id)
      .then(res => {
        setRecipe(res.data);
        setLoading(false);

        // Preload LCP image
        if (res.data.imageUrl) {
          const link = document.createElement('link');
          link.rel          = 'preload';
          link.as           = 'image';
          link.href         = res.data.imageUrl;
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  const handleDeleteConfirm = async () => {
    setShowConfirm(false);
    try {
      await apiService.deleteRecipe(id);
      toast.success('Receta eliminada con éxito.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <Loading message={LOADING_MESSAGES.RECIPE} icon="outdoor_grill" />;

  if (!recipe) return (
    <div className="loading">
      <Loading message={ERROR_MESSAGES.RECIPE_NOT_FOUND} error={true} icon="search_off" />
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        Volver a las recetas
      </Link>
    </div>
  );

  return (
    <div className="recipe-detail-container">
      {/* Back button + breadcrumbs — sticky on mobile */}
      <div className="recipe-detail-header">
        <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Volver
        </Link>
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ margin: 0 }}>
          <Link to="/" className="breadcrumb-link">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">home</span>
            Recetas
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span>{recipe.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="recipe-hero">
        <div className="recipe-hero-image">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={`Fotografía de ${recipe.name}${recipe.baureTranslation ? ` (${recipe.baureTranslation} en lengua Baure)` : ''}, receta tradicional del pueblo Baure`}
              loading="eager"
              fetchpriority="high"
              width="1200"
              height="800"
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<span class="material-symbols-outlined" style="font-size:5rem">outdoor_grill</span>';
              }}
            />
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: '5rem' }}>
              outdoor_grill
            </span>
          )}
        </div>
        <div className="recipe-hero-content">
          <span className="category-badge badge-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }} aria-hidden="true">
              outdoor_grill
            </span>
            Tradicional
          </span>
          <h1 className="recipe-hero-title">{recipe.name}</h1>
          {recipe.baureName && (
            <p className="recipe-hero-subtitle">{recipe.baureName}</p>
          )}
          {recipe.description && (
            <p className="recipe-hero-description">{recipe.description}</p>
          )}
        </div>
      </section>

      {/* Quick info */}
      <div className="recipe-infobox">
        <div className="infobox-grid">
          {recipe.baureName && (
            <div className="infobox-item">
              <span className="infobox-label">
                <span className="material-symbols-outlined" aria-hidden="true">translate</span>
                Nombre Baure
              </span>
              <span className="infobox-value">{recipe.baureName}</span>
            </div>
          )}
          <div className="infobox-item">
            <span className="infobox-label">
              <span className="material-symbols-outlined" aria-hidden="true">category</span>
              Tipo
            </span>
            <span className="infobox-value">
              {recipe.tags?.[0] ?? 'Tradicional'}
            </span>
          </div>
          {recipe.sourcePerson && (
            <div className="infobox-item">
              <span className="infobox-label">
                <span className="material-symbols-outlined" aria-hidden="true">person</span>
                Fuente
              </span>
              <span className="infobox-value">{recipe.sourcePerson}</span>
            </div>
          )}
          {recipe.ingredients?.[0] && (
            <div className="infobox-item">
              <span className="infobox-label">
                <span className="material-symbols-outlined" aria-hidden="true">stars</span>
                Ingrediente principal
              </span>
              <span className="infobox-value">{recipe.ingredients[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="recipe-actions">
        <button
          className="btn btn-primary"
          onClick={() => setShowChatbot(v => !v)}
          aria-expanded={showChatbot}
        >
          <span className="material-symbols-outlined" aria-hidden="true">auto_awesome</span>
          {showChatbot ? 'Cerrar Asistente' : 'Consultar Asistente'}
        </button>

        {isAdmin && (
          <>
            <Link to={`/recipe/${id}/edit`} className="btn btn-outline">
              <span className="material-symbols-outlined" aria-hidden="true">edit</span>
              Editar receta
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="btn btn-outline"
              style={{ color: 'var(--color-error, #dc2626)' }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">delete</span>
              Eliminar
            </button>
          </>
        )}
      </div>

      {/* Chatbot — animated by CSS */}
      {showChatbot && <ChatSection recipe={recipe} />}

      {/* Description */}
      {recipe.description && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">menu_book</span>
            Descripción
          </h3>
          <p>{recipe.description}</p>
        </section>
      )}

      {/* Ingredients */}
      {recipe.ingredients?.length > 0 && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">nutrition</span>
            Ingredientes
          </h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span className="ingredient-bullet" aria-hidden="true" />
                {ing}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Preparation */}
      {recipe.preparation && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">outdoor_grill</span>
            Preparación
          </h3>
          {recipe.preparation.includes('1)') || recipe.preparation.includes('**') ? (
            <div className="preparation-steps">
              {recipe.preparation.split(/\d+\)\s*\*?\*?/).filter(s => s.trim()).map((step, i) => {
                const clean = step.replace(/\*\*/g, '').trim();
                const parts = clean.split(':');
                return (
                  <div key={i} className="preparation-step">
                    <div className="step-number">{i + 1}</div>
                    <div className="step-content">
                      {parts.length > 1 ? (
                        <>
                          <h4 className="step-title">{parts[0].trim()}</h4>
                          <p>{parts.slice(1).join(':').trim()}</p>
                        </>
                      ) : (
                        <p>{clean}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="preparation-text">{recipe.preparation}</p>
          )}
        </section>
      )}

      {/* Utensils */}
      {recipe.utensils?.length > 0 && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">flatware</span>
            Utensilios
          </h3>
          <ul className="ingredients-list">
            {recipe.utensils.map((u, i) => (
              <li key={i} className="ingredient-item">
                <span className="ingredient-bullet" aria-hidden="true" />
                {u}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Consumption */}
      {recipe.consumption && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">restaurant</span>
            Consumo
          </h3>
          <p>{recipe.consumption}</p>
        </section>
      )}

      {/* Conservation */}
      {recipe.conservation && (
        <section className="recipe-detail-section">
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">kitchen</span>
            Conservación
          </h3>
          <p>{recipe.conservation}</p>
        </section>
      )}

      {/* Source */}
      {recipe.sourcePerson && (
        <section className="recipe-detail-section" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <h3 className="section-title-detail">
            <span className="material-symbols-outlined" aria-hidden="true">history_edu</span>
            Fuente
          </h3>
          <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
            {recipe.sourcePerson}
          </p>
        </section>
      )}

      {/* Confirm delete */}
      <ConfirmModal
        open={showConfirm}
        title="¿Eliminar esta receta?"
        message={`Se eliminará "${recipe.name}". Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        danger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}