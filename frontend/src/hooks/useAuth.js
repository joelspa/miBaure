import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook para verificar autenticación del admin
 * Redirige a /admin si no está autenticado
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    const authToken = sessionStorage.getItem('authToken');

    if (adminAuth === 'true' && authToken) {
      setIsAuthenticated(true);
    } else {
      // Redirigir al panel de admin si no está autenticado
      navigate('/admin', { replace: true });
    }

    setLoading(false);
  }, [navigate]);

  return { isAuthenticated, loading };
}
