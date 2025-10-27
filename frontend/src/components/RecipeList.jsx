import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Loading from './Loading';
import { ERROR_MESSAGES, LOADING_MESSAGES, PLACEHOLDERS } from '../config/constants';
import { useDebounce } from '../hooks/useDebounce';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    
    // Debounce de búsqueda para mejor performance
    const debouncedSearch = useDebounce(searchTerm, 300);

    // Categorías de filtrado
    const categories = [
        { value: 'Todos', label: 'Todos', icon: 'filter_list' },
        { value: 'Yuca', label: 'Yuca', icon: 'agriculture' },
        { value: 'Maíz', label: 'Maíz', icon: 'grain' },
        { value: 'Pescado', label: 'Pescado', icon: 'set_meal' },
        { value: 'Bebida', label: 'Bebida', icon: 'local_cafe' },
        { value: 'Desaparecida', label: 'Desaparecida', icon: 'history' }
    ];

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
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = debouncedSearch === '' || 
            recipe.name?.toLowerCase().includes(searchLower) ||
            recipe.baureName?.toLowerCase().includes(searchLower) ||
            recipe.description?.toLowerCase().includes(searchLower) ||
            recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchLower));
        
        if (selectedCategory === 'Todos') return matchesSearch;
        
        // Filtrado por categoría
        const categoryLower = selectedCategory.toLowerCase();
        const matchesCategory = 
            recipe.name?.toLowerCase().includes(categoryLower) ||
            recipe.description?.toLowerCase().includes(categoryLower) ||
            recipe.ingredients?.some(ing => ing.toLowerCase().includes(categoryLower)) ||
            recipe.tags?.some(tag => tag.toLowerCase().includes(categoryLower));
        
        return matchesSearch && matchesCategory;
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

                {/* Category Filters */}
                <div className="category-filters" role="group" aria-label="Filtrar recetas por categoría">
                    {categories.map(cat => (
                        <button
                            key={cat.value}
                            className={selectedCategory === cat.value ? 'tag tag-primary' : 'tag'}
                            onClick={() => setSelectedCategory(cat.value)}
                            aria-label={`Filtrar recetas: ${cat.label}`}
                            aria-pressed={selectedCategory === cat.value}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">
                                {cat.icon}
                            </span>
                            {cat.label}
                        </button>
                    ))}
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
                        autoComplete="off"
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
                                            alt={`Plato tradicional Baure: ${recipe.name}${recipe.baureTranslation ? ` (${recipe.baureTranslation})` : ''}`}
                                            loading="lazy"
                                            width="400"
                                            height="340"
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
                                        <p className="recipe-baure-name">{recipe.baureName}</p>
                                    )}
                                    {recipe.description && (
                                        <p className="recipe-description recipe-description-clamp">
                                            {recipe.description}
                                        </p>
                                    )}
                                    <div className="recipe-tags">
                                        {recipe.tags && recipe.tags.slice(0, 4).map((tag, idx) => (
                                            <span key={idx} className="tag tag-primary">
                                                {tag}
                                            </span>
                                        ))}
                                        {!recipe.tags && recipe.ingredients && recipe.ingredients.slice(0, 3).map((ing, idx) => (
                                            <span key={idx} className="tag tag-secondary">
                                                {ing.split(' ')[0]}
                                            </span>
                                        ))}
                                    </div>
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