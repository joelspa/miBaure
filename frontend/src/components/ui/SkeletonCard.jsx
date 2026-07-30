/**
 * SkeletonCard — placeholder animado durante la carga de recetas/stories.
 * Usa shimmer animation definida en App.css.
 */
export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-subtitle" />
        <div className="skeleton-line skeleton-text" />
        <div className="skeleton-tags">
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
        </div>
      </div>
    </div>
  );
}

/**
 * SkeletonGrid — muestra N skeleton cards en la grilla.
 */
export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="recipes-grid" aria-busy="true" aria-label="Cargando recetas…">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * SkeletonStoryCard — skeleton para las cards de recuentos de vida.
 */
export function SkeletonStoryCard() {
  return (
    <div className="skeleton-card skeleton-story-card" aria-hidden="true">
      <div className="skeleton-img skeleton-story-img" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-subtitle" style={{ width: '60%' }} />
        <div className="skeleton-line skeleton-text" />
        <div className="skeleton-line skeleton-text" style={{ width: '80%' }} />
      </div>
    </div>
  );
}

export function SkeletonStoriesGrid({ count = 4 }) {
  return (
    <div className="stories-grid" aria-busy="true" aria-label="Cargando recuentos…">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonStoryCard key={i} />
      ))}
    </div>
  );
}
