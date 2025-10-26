import { Component } from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          errorCode="500"
          title="Algo salió mal"
          message="Ocurrió un error inesperado. Por favor, intenta recargar la página o vuelve al inicio."
          icon="warning"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
