// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/api.service';
import '../styles/AdminPanel.css';

function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Verificar si ya está autenticado al cargar el componente
    useEffect(() => {
        const adminAuth = sessionStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiService.validateAdminPassword(password);

            if (response.data.valid) {
                // Guardar en sessionStorage (se borra al cerrar el navegador)
                sessionStorage.setItem('adminAuth', 'true');
                // Guardar token para Authorization header
                const token = response.data.token || 'baure-admin-token';
                sessionStorage.setItem('authToken', token);
                setIsAuthenticated(true);
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Contraseña incorrecta');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setPassword('');
    };

    // Modal de autenticación
    if (!isAuthenticated) {
        return (
            <div className="admin-auth-overlay">
                <div className="admin-auth-modal">
                    <div className="admin-auth-header">
                        <span className="material-symbols-outlined">lock</span>
                        <h2>Panel de Administración</h2>
                        <p>Ingresa la contraseña para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="admin-auth-form">
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="form-input"
                                autoFocus
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        <div className="admin-auth-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="btn btn-outline"
                                disabled={loading}
                                aria-label="Volver a la página principal"
                            >
                                <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading || !password}
                                aria-label="Acceder al panel de administración"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined spinning" aria-hidden="true">sync</span>
                                        Verificando...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined" aria-hidden="true">login</span>
                                        Acceder
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Panel de administración (ya autenticado)
    return (
        <div className="admin-panel">
            <div className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-title">
                        <span className="material-symbols-outlined">admin_panel_settings</span>
                        <h1>Panel de Administración</h1>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline" aria-label="Cerrar sesión de administrador">
                        <span className="material-symbols-outlined" aria-hidden="true">logout</span>
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-grid">
                    {/* Card: Crear Receta */}
                    <div className="admin-card">
                        <div className="admin-card-icon recipe-icon">
                            <span className="material-symbols-outlined">restaurant</span>
                        </div>
                        <h3>Crear Receta</h3>
                        <p>Agregar una nueva receta tradicional Baure al archivo</p>
                        <Link to="/crear" className="btn btn-primary">
                            <span className="material-symbols-outlined">add</span>
                            Nueva Receta
                        </Link>
                    </div>

                    {/* Card: Crear Recuento de Vida */}
                    <div className="admin-card">
                        <div className="admin-card-icon story-icon">
                            <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <h3>Crear Recuento de Vida</h3>
                        <p>Registrar historias y testimonios de la comunidad</p>
                        <Link to="/recuentos/crear" className="btn btn-primary">
                            <span className="material-symbols-outlined">add</span>
                            Nuevo Recuento
                        </Link>
                    </div>

                    {/* Card: Crear Dato Cultural */}
                    <div className="admin-card">
                        <div className="admin-card-icon culture-icon">
                            <span className="material-symbols-outlined">public</span>
                        </div>
                        <h3>Crear Dato Cultural</h3>
                        <p>Agregar información sobre la cultura Baure</p>
                        <Link to="/cultura/crear" className="btn btn-primary">
                            <span className="material-symbols-outlined">add</span>
                            Nuevo Dato Cultural
                        </Link>
                    </div>

                    {/* Card: Ver Recetas */}
                    <div className="admin-card">
                        <div className="admin-card-icon view-icon">
                            <span className="material-symbols-outlined">menu_book</span>
                        </div>
                        <h3>Ver Recetas</h3>
                        <p>Explorar todas las recetas registradas</p>
                        <Link to="/" className="btn btn-outline">
                            <span className="material-symbols-outlined">visibility</span>
                            Ver Todas
                        </Link>
                    </div>

                    {/* Card: Ver Recuentos */}
                    <div className="admin-card">
                        <div className="admin-card-icon view-icon">
                            <span className="material-symbols-outlined">people</span>
                        </div>
                        <h3>Ver Recuentos</h3>
                        <p>Explorar todas las historias de vida</p>
                        <Link to="/recuentos" className="btn btn-outline">
                            <span className="material-symbols-outlined">visibility</span>
                            Ver Todos
                        </Link>
                    </div>

                    {/* Card: Ver Datos Culturales */}
                    <div className="admin-card">
                        <div className="admin-card-icon view-icon">
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                        <h3>Ver Datos Culturales</h3>
                        <p>Explorar toda la información cultural registrada</p>
                        <Link to="/cultura" className="btn btn-outline">
                            <span className="material-symbols-outlined">visibility</span>
                            Ver Todos
                        </Link>
                    </div>

                    {/* Card: Instrucciones */}
                    <div className="admin-card admin-card-full">
                        <div className="admin-card-icon info-icon">
                            <span className="material-symbols-outlined">info</span>
                        </div>
                        <h3>Instrucciones de Uso</h3>
                        <ul className="admin-instructions">
                            <li>
                                <span className="material-symbols-outlined">check_circle</span>
                                Esta sesión es temporal y se cerrará al cerrar el navegador
                            </li>
                            <li>
                                <span className="material-symbols-outlined">check_circle</span>
                                Usa los botones de arriba para crear nuevo contenido
                            </li>
                            <li>
                                <span className="material-symbols-outlined">check_circle</span>
                                Los cambios se guardan automáticamente en la base de datos
                            </li>
                            <li>
                                <span className="material-symbols-outlined">check_circle</span>
                                La URL de este panel es secreta, no la compartas
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
