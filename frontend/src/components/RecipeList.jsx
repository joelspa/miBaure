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

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
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
            {recipe.tags?.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="tag tag-primary">{tag}</span>
            ))}
            {!recipe.tags && recipe.ingredients?.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="tag tag-secondary">{ing.split(' ')[0]}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyState({ searchTerm, onClear }) {
  return (
    <div className="empty-state">
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
      <div className="empty-state" style={{ minHeight: '60vh' }}>
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
    <div className="recipe-list">
      {/* Hero banner */}
      <div className="section-hero">
        <p className="section-hero-eyebrow">
          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }} aria-hidden="true">
            outdoor_grill
          </span>
          Pueblo Baure — Bolivia
        </p>
        <h2 className="section-hero-title">Recetas Tradicionales</h2>
        <p className="section-hero-desc">
          Un archivo vivo de sabores ancestrales: recetas recopiladas directamente
          de la comunidad Baure para preservar su patrimonio gastronómico.
        </p>
      </div>

      <div className="section">
        {/* Category filters */}
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

        {/* Search bar */}
        <div className="search-container">
          <span className="material-symbols-outlined search-icon" aria-hidden="true">search</span>
          <input
            type="search"
            className="search-input"
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

        {/* Count badge */}
        {!loading && (
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <span className="category-badge badge-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">
                outdoor_grill
              </span>
              {filteredRecipes.length} receta{filteredRecipes.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : filteredRecipes.length === 0 ? (
          <EmptyState searchTerm={debouncedSearch} onClear={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} />
        ) : (
          <div className="recipes-grid" role="list" aria-label="Lista de recetas">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}