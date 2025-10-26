import ErrorPage from './ErrorPage';

export default function ServerError() {
  return (
    <ErrorPage
      errorCode="500"
      title="Error del servidor"
      message="Ocurrió un error en el servidor. Por favor, intenta de nuevo más tarde."
      icon="error"
    />
  );
}
