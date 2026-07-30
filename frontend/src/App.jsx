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

/* ─── Sidebar (Desktop) & TopBar (Mobile fallback for branding) ─── */
function AppSidebar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? 'sidebar-link active' : 'sidebar-link';
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

  return (
    <>
      <aside className="app-sidebar glass">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" aria-label="Inicio — Archivo Baure">
            <span className="material-symbols-outlined brand-icon" aria-hidden="true">
              eco
            </span>
            <div className="brand-text">
              <span className="brand-title">Archivo Baure</span>
              <span className="brand-subtitle">Cocina y memoria</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <ul className="sidebar-links">
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
                  auto_stories
                </span>
                Recuentos
              </Link>
            </li>
            <li>
              <Link to="/cultura" className={isActive('/cultura')}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  public
                </span>
                Cultura
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            className="btn btn-icon sidebar-theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="toggle-label">{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>

          {isAdmin && (
            <Link to="/admin" className="btn btn-outline sidebar-admin-btn">
              <span className="material-symbols-outlined" aria-hidden="true">
                admin_panel_settings
              </span>
              Admin
            </Link>
          )}
        </div>
      </aside>
      
      {/* Mobile Top Bar (Solo Logo y Theme Toggle) */}
      <header className="mobile-topbar glass">
         <Link to="/" className="mobile-brand">
            <span className="material-symbols-outlined brand-icon" aria-hidden="true">eco</span>
            <span className="brand-title">Archivo Baure</span>
         </Link>
         <button className="btn btn-icon" onClick={toggleDarkMode}>
            <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
         </button>
      </header>
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
        <div className="app-layout">
          <a href="#main-content" className="skip-to-main">
            Saltar al contenido principal
          </a>

          <AppSidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main id="main-content" className="app-main">
            <AnimatedRoutes />
            
            <footer className="app-footer">
              <p>© 2025 Archivo Baure — Cocina y memoria amazónica</p>
            </footer>
          </main>

          <BottomNav />
          <ToastContainer />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
