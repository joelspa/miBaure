import { useEffect, useRef } from 'react';
import { useToastContext } from '../../context/ToastContext';

const ICONS = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

function ToastItem({ id, message, type, duration, onRemove }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timerRef.current);
  }, [id, duration, onRemove]);

  return (
    <div
      className={`toast-item toast-${type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="material-symbols-outlined toast-icon" aria-hidden="true">
        {ICONS[type]}
      </span>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={() => onRemove(id)}
        aria-label="Cerrar notificación"
      >
        <span className="material-symbols-outlined" aria-hidden="true">close</span>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="toast-container" aria-label="Notificaciones">
      {toasts.map(t => (
        <ToastItem
          key={t.id}
          {...t}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}
