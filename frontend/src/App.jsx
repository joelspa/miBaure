// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import LifeStories from './components/LifeStories';
import BaureCulture from './components/BaureCulture';
import RecipeCreate from './components/RecipeCreate';
import RecipeEdit from './components/RecipeEdit';
import LifeStoryCreate from './components/LifeStoryCreate';
import LifeStoryEdit from './components/LifeStoryEdit';
import CulturalDataCreate from './components/CulturalDataCreate';
import CulturalDataEdit from './components/CulturalDataEdit';
import AdminPanel from './components/AdminPanel';

import './styles/App.css';

function AppHeader({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'nav-link active' : 'nav-link');
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-brand">
            <span className="material-symbols-outlined brand-icon" aria-hidden="true">outdoor_grill</span>
            <div className="brand-text">
              <h1>Archivo Baure</h1>
              <p>Cocina, memoria y territorio</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="btn btn-outline"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            {isAdmin && (
              <Link to="/admin-panel-baure" className="btn btn-primary" aria-label="Ir al panel de administración">
                <span className="material-symbols-outlined" aria-hidden="true">admin_panel_settings</span>
                Panel Admin
              </Link>
            )}
            <Link to="/" className="btn btn-outline" aria-label="Ir a la página de inicio">
              <span className="material-symbols-outlined" aria-hidden="true">home</span>
              Inicio
            </Link>
          </div>
        </div>
        <div className="motif-bar" aria-hidden="true"></div>
      </header>

      {/* Navigation */}
      <nav className="navbar" aria-label="Navegación principal">
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }} aria-hidden="true">
                restaurant_menu
              </span>
              Recetas
            </Link>
          </li>
          <li>
            <Link to="/recuentos" className={isActive('/recuentos')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }} aria-hidden="true">
                history_edu
              </span>
              Recuentos de Vida
            </Link>
          </li>
          <li>
            <Link to="/cultura" className={isActive('/cultura')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }} aria-hidden="true">
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

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  return (
    <Router>
      <div className="App">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Saltar al contenido principal
        </a>

        <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Content */}
        <main id="main-content" className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/recipe/:id/edit" element={<RecipeEdit />} />
              <Route path="/recuentos" element={<LifeStories />} />
              <Route path="/recuentos/:id/edit" element={<LifeStoryEdit />} />
              <Route path="/recuentos/crear" element={<LifeStoryCreate />} />
              <Route path="/cultura" element={<BaureCulture />} />
              <Route path="/cultura/:id/edit" element={<CulturalDataEdit />} />
              <Route path="/cultura/crear" element={<CulturalDataCreate />} />
              <Route path="/crear" element={<RecipeCreate />} />
              <Route path="/admin-panel-baure" element={<AdminPanel />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p>© 2025 Archivo Baure - Cocina, memoria y territorio del pueblo Baure</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.7 }}>
              Preservando nuestra cultura gastronómica amazónica
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
