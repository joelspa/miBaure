// src/App.jsx
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import RecipeList      from './components/RecipeList';
import RecipeDetail    from './components/RecipeDetail';
import LifeStories     from './components/LifeStories';
import BaureCulture    from './components/BaureCulture';
import RecipeCreate    from './components/RecipeCreate';
import RecipeEdit      from './components/RecipeEdit';
import LifeStoryCreate from './components/LifeStoryCreate';
import LifeStoryEdit   from './components/LifeStoryEdit';
import CulturalDataCreate from './components/CulturalDataCreate';
import CulturalDataEdit   from './components/CulturalDataEdit';
import AdminPanel      from './components/AdminPanel';
import NotFound        from './components/NotFound';

import BottomNav       from './components/ui/BottomNav';
import ToastContainer  from './components/ui/Toast';
import { ToastProvider } from './context/ToastContext';

import './styles/App.css';

/* ─── Header ─────────────────────────────────────────────────── */
function AppHeader({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo — actúa como home link */}
          <Link to="/" className="header-brand" aria-label="Ir a la página de inicio — Archivo Baure">
            <span className="material-symbols-outlined brand-icon" aria-hidden="true">
              outdoor_grill
            </span>
            <div className="brand-text">
              <span className="brand-title">Archivo Baure</span>
              <span className="brand-subtitle">Cocina, memoria y territorio</span>
            </div>
          </Link>

          <div className="header-actions">
            <button
              className="btn btn-icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="btn btn-outline btn-sm"
                aria-label="Ir al panel de administración"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  admin_panel_settings
                </span>
                <span className="btn-label-hide-xs">Admin</span>
              </Link>
            )}
          </div>
        </div>

        {/* Motif bar decorativa */}
        <div className="motif-bar" aria-hidden="true" />
      </header>

      {/* Desktop navigation — oculta en mobile (reemplazada por BottomNav) */}
      <nav className="navbar" aria-label="Navegación principal">
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/')}>
              <span className="material-symbols-outlined" aria-hidden="true">
                restaurant_menu
              </span>
              Recetas
            </Link>
          </li>
          <li>
            <Link to="/recuentos" className={isActive('/recuentos')}>
              <span className="material-symbols-outlined" aria-hidden="true">
                history_edu
              </span>
              Recuentos de Vida
            </Link>
          </li>
          <li>
            <Link to="/cultura" className={isActive('/cultura')}>
              <span className="material-symbols-outlined" aria-hidden="true">
                account_balance
              </span>
              Cultura Baure
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

/* ─── Animated Routes ─────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-transition-wrapper" key={location.pathname}>
      <Routes location={location}>
        <Route path="/"                     element={<RecipeList />} />
        <Route path="/recipe/:id"           element={<RecipeDetail />} />
        <Route path="/recipe/:id/edit"      element={<RecipeEdit />} />
        <Route path="/recuentos"            element={<LifeStories />} />
        <Route path="/recuentos/:id/edit"   element={<LifeStoryEdit />} />
        <Route path="/recuentos/crear"      element={<LifeStoryCreate />} />
        <Route path="/cultura"              element={<BaureCulture />} />
        <Route path="/cultura/:id/edit"     element={<CulturalDataEdit />} />
        <Route path="/cultura/crear"        element={<CulturalDataCreate />} />
        <Route path="/crear"                element={<RecipeCreate />} />
        <Route path="/admin"                element={<AdminPanel />} />
        <Route path="*"                     element={<NotFound />} />
      </Routes>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Default: respetar preferencia del sistema si no hay nada guardado
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(v => !v);

  return (
    <Router>
      <ToastProvider>
        <div className="App">
          {/* Skip to content — accesibilidad */}
          <a href="#main-content" className="skip-to-main">
            Saltar al contenido principal
          </a>

          <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main id="main-content" className="main-content">
            <div className="content-wrapper">
              <AnimatedRoutes />
            </div>
          </main>

          <footer className="footer">
            <div className="footer-container">
              <p>© 2025 Archivo Baure — Cocina, memoria y territorio del pueblo Baure</p>
              <p className="footer-sub">Preservando nuestra cultura gastronómica amazónica</p>
            </div>
          </footer>

          {/* Mobile bottom navigation */}
          <BottomNav />

          {/* Toast notifications */}
          <ToastContainer />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
