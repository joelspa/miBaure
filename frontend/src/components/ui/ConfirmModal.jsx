import { useEffect, useRef } from 'react';

/**
 * ConfirmModal — reemplaza window.confirm() con un modal propio animado.
 *
 * Props:
 *   open        — boolean
 *   title       — string
 *   message     — string
 *   confirmText — string (default "Eliminar")
 *   cancelText  — string (default "Cancelar")
 *   onConfirm   — () => void
 *   onCancel    — () => void
 *   danger      — boolean (tinte rojo en el botón de confirmación)
 */
export default function ConfirmModal({
  open,
  title = '¿Confirmar acción?',
  message = '',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  danger = false,
}) {
  const cancelBtnRef = useRef(null);

  // Focus trap: enfocar el botón de cancelar al abrir
  useEffect(() => {
    if (open && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      onClick={(e) => e.target === e.currentTarget && onCancel?.()}
    >
      <div className="confirm-modal">
        <div className="confirm-icon-wrap">
          <span
            className="material-symbols-outlined confirm-icon"
            aria-hidden="true"
            style={{ color: danger ? 'var(--color-error, #dc2626)' : 'var(--color-primary)' }}
          >
            {danger ? 'delete_forever' : 'help'}
          </span>
        </div>

        <h2 id="confirm-title" className="confirm-title">{title}</h2>
        {message && (
          <p id="confirm-message" className="confirm-message">{message}</p>
        )}

        <div className="confirm-actions">
          <button
            ref={cancelBtnRef}
            className="btn btn-outline"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
