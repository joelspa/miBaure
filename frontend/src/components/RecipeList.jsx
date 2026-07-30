import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import { useDebounce } from '../hooks/useDebounce';
import { SkeletonGrid } from './ui/SkeletonCard';
import { PLACEHOLDERS } from '../config/constants';

const categories = [
  { value: 'Todos',       label: 'Todos',       icon: 'filter_list' },
  { value: 'Yuca',        label: 'Yuca',        icon: 'agriculture' },
  { value: 'Maíz',        label: 'Maíz',        icon: 'grain' },
  { value: 'Pescado',     label: 'Pescado',     icon: 'set_meal' },
  { value: 'Bebida',      label: 'Bebida',      icon: 'local_cafe' },
  { value: 'Desaparecida',label: 'Desaparecida',icon: 'history' },
];

function RecipeCard({ recipe, index }) {
  // Para hacer que algunos items sean más grandes (estilo bento)
  const isLarge = index % 5 === 0; // 1 de cada 5 items será más grande en grid

  return (
    <article 
      className={`recipe-card bento-item ${isLarge ? 'bento-large' : ''}`} 
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to={`/recipe/${recipe._id}`} className="recipe-link">
        <div className={recipe.imageUrl ? 'recipe-image' : 'recipe-image-placeholder'}>
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={`Plato tradicional Baure: ${recipe.name}${recipe.baureTranslation ? ` (${recipe.baureTranslation})` : ''}`}
              loading="lazy"
              width="400"
              height="340"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<span class="material-symbols-outlined">restaurant_menu</span>';
              }}
            />
          ) : (
            <span className="material-symbols-outlined">restaurant_menu</span>
          )}
        </div>
        <div className="recipe-body glass-inner">
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
            {recipe.tags?.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="chip chip-primary">{tag}</span>
            ))}
            {!recipe.tags && recipe.ingredients?.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="chip chip-secondary">{ing.split(' ')[0]}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyState({ searchTerm, onClear }) {
  return (
    <div className="empty-state glass">
      <div className="empty-state-icon">
        <span className="material-symbols-outlined" aria-hidden="true">search_off</span>
      </div>
      <h3 className="empty-state-title">
        {searchTerm ? 'No se encontraron recetas' : 'Aún no hay recetas'}
      </h3>
      <p className="empty-state-desc">
        {searchTerm
          ? `No hay resultados para "${searchTerm}". Probá con otra palabra clave o categoría.`
          : 'No hay recetas en esta categoría por el momento.'}
      </p>
      {searchTerm && (
        <button className="btn btn-outline" onClick={onClear}>
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
}

export default function RecipeList() {
  const [recipes, setRecipes]                 = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [searchTerm, setSearchTerm]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    apiService.getAllRecipes()
      .then(res  => { setRecipes(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError('No se pudieron cargar las recetas.'); setLoading(false); });
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const q = debouncedSearch.toLowerCase();
    const matchesSearch = !q ||
      recipe.name?.toLowerCase().includes(q) ||
      recipe.baureName?.toLowerCase().includes(q) ||
      recipe.description?.toLowerCase().includes(q) ||
      recipe.ingredients?.some(i => i.toLowerCase().includes(q));

    if (selectedCategory === 'Todos') return matchesSearch;

    const cat = selectedCategory.toLowerCase();
    const matchesCategory =
      recipe.name?.toLowerCase().includes(cat) ||
      recipe.description?.toLowerCase().includes(cat) ||
      recipe.ingredients?.some(i => i.toLowerCase().includes(cat)) ||
      recipe.tags?.some(t => t.toLowerCase().includes(cat));

    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="empty-state glass" style={{ minHeight: '60vh' }}>
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
    );
  }

  return (
    <div className="recipe-list animate-in">
      {/* Hero banner Inmersivo */}
      <div className="hero-immersive">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="material-symbols-outlined" aria-hidden="true">eco</span>
            Tesoros de la Selva
          </p>
          <h2 className="hero-title">Recetario Baure</h2>
          <p className="hero-desc">
            Un archivo vivo de sabores ancestrales. Explorá nuestra herencia culinaria, directamente de la comunidad Baure.
          </p>
          
          {/* Search bar inside Hero */}
          <div className="search-container hero-search glass">
            <span className="material-symbols-outlined search-icon" aria-hidden="true">search</span>
            <input
              type="search"
              className="search-input transparent-input"
              placeholder={PLACEHOLDERS.SEARCH_RECIPE ?? 'Buscar receta, ingrediente…'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Buscar recetas"
              autoComplete="off"
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm('')} aria-label="Limpiar búsqueda">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="section page-container">
        {/* Category filters */}
        <div className="category-filters filters-container" role="group" aria-label="Filtrar recetas por categoría">
          <ul className="filters-list">
            {categories.map(cat => (
              <li key={cat.value}>
                <button
                  className={selectedCategory === cat.value ? 'chip chip-primary' : 'chip chip-secondary'}
                  onClick={() => setSelectedCategory(cat.value)}
                  aria-label={`Filtrar recetas: ${cat.label}`}
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

        {/* Content */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : filteredRecipes.length === 0 ? (
          <EmptyState searchTerm={debouncedSearch} onClear={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} />
        ) : (
          <div className="bento-grid" role="list" aria-label="Lista de recetas">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}