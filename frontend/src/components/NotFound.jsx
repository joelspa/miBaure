import ErrorPage from './ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      errorCode="404"
      title="Página no encontrada"
      message="La página que buscas no existe. Puede que haya sido movida o eliminada."
      icon="search_off"
    />
  );
}
