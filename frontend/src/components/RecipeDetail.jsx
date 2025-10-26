import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import Loading from './Loading';
import ChatSection from './ChatSection';
import { ERROR_MESSAGES, LOADING_MESSAGES } from '../config/constants';

function RecipeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChatbot, setShowChatbot] = useState(false);
    const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar la receta "${recipe.name}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await apiService.deleteRecipe(id);
            alert('Receta eliminada con éxito');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar la receta: ' + (err.response?.data?.message || err.message));
        }
    };

    useEffect(() => {
        apiService.getRecipeById(id)
            .then(res => {
                setRecipe(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading message={LOADING_MESSAGES.RECIPE} icon="outdoor_grill" />;
    
    if (!recipe) return (
        <div className="loading">
            <Loading message={ERROR_MESSAGES.RECIPE_NOT_FOUND} error={true} icon="search_off" />
            <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                <span className="material-symbols-outlined">arrow_back</span>
                Volver a las recetas
            </Link>
        </div>
    );

    return (
        <div className="recipe-detail-container">
            {/* Back Button + Breadcrumbs */}
            <div className="recipe-detail-header">
                <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver
                </Link>
                <nav className="breadcrumbs" aria-label="breadcrumb" style={{ margin: 0 }}>
                    <Link to="/" className="breadcrumb-link">
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>home</span>
                        Recetas
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span>{recipe.name}</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="recipe-hero">
                <div className="recipe-hero-image">
                    {recipe.imageUrl ? (
                        <img 
                            src={recipe.imageUrl} 
                            alt={recipe.name}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<span class="material-symbols-outlined" style="font-size: 5rem;">outdoor_grill</span>';
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
                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>outdoor_grill</span>
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

            {/* AI Actions */}
            <div className="recipe-actions">
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowChatbot(!showChatbot)}
                >
                    <span className="material-symbols-outlined">auto_awesome</span>
                    {showChatbot ? 'Cerrar Asistente' : 'Crear Variante'}
                </button>
                {isAdmin && (
                    <>
                        <Link to={`/recipe/${id}/edit`} className="btn btn-outline">
                            <span className="material-symbols-outlined">edit</span>
                            Editar receta
                        </Link>
                        <button onClick={handleDelete} className="btn btn-outline" style={{ color: 'var(--color-error, #dc2626)' }}>
                            <span className="material-symbols-outlined">delete</span>
                            Eliminar
                        </button>
                    </>
                )}
            </div>

            {/* Chatbot */}
            {showChatbot && <ChatSection recipe={recipe} />}

            {/* Description */}
            {recipe.description && (
                <section className="recipe-detail-section">
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">menu_book</span>
                        Descripción
                    </h3>
                    <p>{recipe.description}</p>
                </section>
            )}

            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <section className="recipe-detail-section">
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">nutrition</span>
                        Ingredientes
                    </h3>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-bullet"></span>
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
                        <span className="material-symbols-outlined">outdoor_grill</span>
                        Preparación
                    </h3>
                    <p>{recipe.preparation}</p>
                </section>
            )}

            {/* Utensils */}
            {recipe.utensils && recipe.utensils.length > 0 && (
                <section className="recipe-detail-section">
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">flatware</span>
                        Utensilios
                    </h3>
                    <ul className="ingredients-list">
                        {recipe.utensils.map((utensil, index) => (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-bullet"></span>
                                {utensil}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Consumption */}
            {recipe.consumption && (
                <section className="recipe-detail-section">
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">restaurant</span>
                        Consumo
                    </h3>
                    <p>{recipe.consumption}</p>
                </section>
            )}

            {/* Conservation */}
            {recipe.conservation && (
                <section className="recipe-detail-section">
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">kitchen</span>
                        Conservación
                    </h3>
                    <p>{recipe.conservation}</p>
                </section>
            )}

            {/* Source */}
            {recipe.sourcePerson && (
                <section className="recipe-detail-section" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                    <h3 className="section-title-detail">
                        <span className="material-symbols-outlined">history_edu</span>
                        Fuente
                    </h3>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        {recipe.sourcePerson}
                    </p>
                </section>
            )}
        </div>
    );
}

export default RecipeDetail;