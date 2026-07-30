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
    <div className="recipe-split-layout animate-in">
      {/* Columna Izquierda: Imagen Sticky */}
      <div className="recipe-split-left">
        <div className="recipe-image-sticky">
          {/* Botón Volver Flotante */}
          <Link to="/" className="btn-back-floating glass" aria-label="Volver">
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          </Link>
          
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={`Fotografía de ${recipe.name}${recipe.baureTranslation ? ` (${recipe.baureTranslation} en lengua Baure)` : ''}`}
              loading="eager"
              fetchpriority="high"
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<span class="material-symbols-outlined" style="font-size:5rem; color: var(--color-primary);">outdoor_grill</span>';
              }}
            />
          ) : (
            <div className="placeholder-image">
              <span className="material-symbols-outlined" style={{ fontSize: '5rem', color: 'var(--color-primary)' }}>
                outdoor_grill
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Columna Derecha: Contenido Scrolleable */}
      <div className="recipe-split-right">
        <div className="recipe-content-wrapper">
          
          <nav className="breadcrumbs" aria-label="breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">home</span>
              Recetas
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span>{recipe.name}</span>
          </nav>

          <header className="recipe-header">
            <div className="recipe-tags-header">
              <span className="chip chip-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">
                  outdoor_grill
                </span>
                Tradicional
              </span>
              {recipe.tags?.map((tag, idx) => (
                <span key={idx} className="chip chip-secondary">{tag}</span>
              ))}
            </div>
            <h1 className="recipe-title-main">{recipe.name}</h1>
            {recipe.baureName && (
              <p className="recipe-subtitle-baure">{recipe.baureName}</p>
            )}
            {recipe.description && (
              <p className="recipe-desc-lead">{recipe.description}</p>
            )}
          </header>

          <div className="recipe-infobox glass">
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
              <div className="admin-actions">
                <Link to={`/recipe/${id}/edit`} className="btn btn-outline">
                  <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                  Editar
                </Link>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="btn btn-outline"
                  style={{ color: 'var(--color-error)' }}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                  Eliminar
                </button>
              </div>
            )}
          </div>

          {/* Chatbot */}
          {showChatbot && <ChatSection recipe={recipe} />}

          <div className="recipe-details-content">
            {/* Ingredients */}
            {recipe.ingredients?.length > 0 && (
              <section className="recipe-detail-section">
                <h3 className="section-title-detail">
                  <span className="material-symbols-outlined" aria-hidden="true">nutrition</span>
                  Ingredientes
                </h3>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-item glass-inner">
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
                        <div key={i} className="preparation-step glass-inner">
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
                  <p className="preparation-text glass-inner">{recipe.preparation}</p>
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
                <ul className="ingredients-list grid-2-cols">
                  {recipe.utensils.map((u, i) => (
                    <li key={i} className="ingredient-item glass-inner">
                      <span className="ingredient-bullet" aria-hidden="true" />
                      {u}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Consumption & Conservation */}
            <div className="recipe-grid-2">
              {recipe.consumption && (
                <section className="recipe-detail-section">
                  <h3 className="section-title-detail">
                    <span className="material-symbols-outlined" aria-hidden="true">restaurant</span>
                    Consumo
                  </h3>
                  <p className="glass-inner p-4">{recipe.consumption}</p>
                </section>
              )}

              {recipe.conservation && (
                <section className="recipe-detail-section">
                  <h3 className="section-title-detail">
                    <span className="material-symbols-outlined" aria-hidden="true">kitchen</span>
                    Conservación
                  </h3>
                  <p className="glass-inner p-4">{recipe.conservation}</p>
                </section>
              )}
            </div>
            
          </div>
        </div>
      </div>

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