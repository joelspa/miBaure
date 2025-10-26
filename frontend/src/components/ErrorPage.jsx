import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ 
  errorCode = '404', 
  title = 'Página no encontrada',
  message = 'La página que buscas no existe o ha sido movida.',
  icon = 'error',
  showHomeButton = true 
}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${errorCode} - ${title} | Archivo Baure`;
  }, [errorCode, title]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        </div>
        
        <h1 className="error-code">{errorCode}</h1>
        <h2 className="error-title">{title}</h2>
        <p className="error-message">{message}</p>

        <div className="error-actions">
          {showHomeButton && (
            <button 
              onClick={handleGoHome} 
              className="btn btn-primary"
              aria-label="Ir a la página principal"
            >
              <span className="material-symbols-outlined" aria-hidden="true">home</span>
              Ir al inicio
            </button>
          )}
          <button 
            onClick={handleGoBack} 
            className="btn btn-outline"
            aria-label="Volver a la página anterior"
          >
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            Volver atrás
          </button>
        </div>

        <div className="error-decoration" aria-hidden="true">
          <span className="material-symbols-outlined">outdoor_grill</span>
        </div>
      </div>
    </div>
  );
}
