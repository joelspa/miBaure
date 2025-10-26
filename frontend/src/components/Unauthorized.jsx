import ErrorPage from './ErrorPage';

export default function Unauthorized() {
  return (
    <ErrorPage
      errorCode="401"
      title="Acceso no autorizado"
      message="No tienes permiso para acceder a esta página. Por favor, inicia sesión como administrador."
      icon="lock"
      showHomeButton={true}
    />
  );
}
