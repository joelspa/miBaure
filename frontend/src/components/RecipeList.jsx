import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Loading from './Loading';
import { ERROR_MESSAGES, LOADING_MESSAGES, PLACEHOLDERS } from '../config/constants';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        apiService.getAllRecipes()
            .then(res => {
                setRecipes(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(ERROR_MESSAGES.LOAD_RECIPES);
                setLoading(false);
            });
    }, []);

    const filteredRecipes = recipes.filter(recipe => {
        const searchLower = searchTerm.toLowerCase();
        return recipe.name?.toLowerCase().includes(searchLower) ||
            recipe.baureName?.toLowerCase().includes(searchLower) ||
            recipe.description?.toLowerCase().includes(searchLower);
    });

    if (loading) return <Loading message={LOADING_MESSAGES.RECIPES} />;
    if (error) return <Loading message={error} error={true} icon="error" />;

    return (
        <div className="recipe-list">
            {/* Section Header */}
            <div className="section">
                <div className="section-header">
                    <h2 className="section-title">Recetas Tradicionales</h2>
                    <span className="category-badge badge-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                            outdoor_grill
                        </span>
                        {filteredRecipes.length} recetas
                    </span>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="search"
                        className="search-input"
                        placeholder={PLACEHOLDERS.SEARCH_RECIPE}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Buscar recetas"
                    />
                    {searchTerm && (
                        <button
                            className="search-clear"
                            onClick={() => setSearchTerm('')}
                            aria-label="Limpiar búsqueda"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>

                {/* Recipes Grid */}
                <div className="recipes-grid" role="list" aria-label="Lista de recetas">
                    {filteredRecipes.map(recipe => (
                        <article key={recipe._id} className="recipe-card">
                            <Link to={`/recipe/${recipe._id}`} className="recipe-link">
                                <div className={recipe.imageUrl ? "recipe-image" : "recipe-image-placeholder"}>
                                    {recipe.imageUrl ? (
                                        <img 
                                            src={recipe.imageUrl} 
                                            alt={recipe.name}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = '<span class="material-symbols-outlined">restaurant_menu</span>';
                                            }}
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined">
                                            restaurant_menu
                                        </span>
                                    )}
                                </div>
                                <div className="recipe-body">
                                    <h3 className="recipe-title">{recipe.name}</h3>
                                    {recipe.baureName && (
                                        <p className="recipe-subtitle">{recipe.baureName}</p>
                                    )}
                                    {recipe.description && (
                                        <p className="recipe-description">
                                            {recipe.description.substring(0, 120)}...
                                        </p>
                                    )}
                                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                                        <div className="recipe-tags">
                                            {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                                                <span key={idx} className="tag tag-secondary">
                                                    {ing.length > 20 ? ing.substring(0, 20) + '...' : ing}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <Loading message={PLACEHOLDERS.NO_RECIPES} icon="search_off" />
                )}
            </div>
        </div>
    );
}

export default RecipeList;