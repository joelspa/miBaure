import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/',          label: 'Recetas',   iconFilled: 'restaurant_menu', icon: 'restaurant_menu' },
  { to: '/recuentos', label: 'Recuentos', iconFilled: 'history_edu',     icon: 'history_edu' },
  { to: '/cultura',   label: 'Cultura',   iconFilled: 'account_balance',  icon: 'account_balance' },
];

/**
 * BottomNav — barra de navegación fija en la parte inferior para mobile.
 * Solo visible en viewports <= 768px (controlado por CSS).
 */
export default function BottomNav() {
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <nav className="bottom-nav" aria-label="Navegación principal móvil">
      {NAV_ITEMS.map(item => {
        const active = isActive(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item${active ? ' active' : ''}`}
            aria-current={active ? 'page' : undefined}
            aria-label={item.label}
          >
            <span
              className="material-symbols-outlined bottom-nav-icon"
              aria-hidden="true"
              style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              {item.icon}
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
