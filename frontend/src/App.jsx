// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import LifeStories from './components/LifeStories';
import BaureCulture from './components/BaureCulture';
import RecipeCreate from './components/RecipeCreate';
import LifeStoryCreate from './components/LifeStoryCreate';

import './App.css';

function AppHeader({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'nav-link active' : 'nav-link');

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-brand">
            <span className="material-symbols-outlined brand-icon">outdoor_grill</span>
            <div className="brand-text">
              <h1>Archivo Baure</h1>
              <p>Cocina, memoria y territorio</p>
            </div>
          </div>

          <div className="header-actions">
            <Link to="/crear" className="btn btn-primary">
              <span className="material-symbols-outlined">add</span>
              Nueva receta
            </Link>
            <Link to="/recuentos/crear" className="btn btn-primary">
              <span className="material-symbols-outlined">add</span>
              Nuevo recuento
            </Link>
            <button
              className="btn btn-outline"
              onClick={toggleDarkMode}
              aria-label="Cambiar modo de color"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <Link to="/" className="btn btn-outline">
              <span className="material-symbols-outlined">home</span>
              Inicio
            </Link>
          </div>
        </div>
        <div className="motif-bar"></div>
      </header>

      {/* Navigation */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                restaurant_menu
              </span>
              Recetas
            </Link>
          </li>
          <li>
            <Link to="/recuentos" className={isActive('/recuentos')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                history_edu
              </span>
              Recuentos de Vida
            </Link>
          </li>
          <li>
            <Link to="/cultura" className={isActive('/cultura')}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
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
        <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/recuentos" element={<LifeStories />} />
              <Route path="/recuentos/crear" element={<LifeStoryCreate />} />
              <Route path="/cultura" element={<BaureCulture />} />
              <Route path="/crear" element={<RecipeCreate />} />
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
