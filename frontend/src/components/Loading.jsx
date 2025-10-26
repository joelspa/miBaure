// Componente reutilizable para estados de carga y error
export default function Loading({ message, error = false, icon = 'hourglass_empty' }) {
  return (
    <div className={`loading ${error ? 'error' : ''}`}>
      <span
        className="material-symbols-outlined"
        aria-hidden="false"
        style={{ fontSize: '3rem' }}
      >
        {icon}
      </span>
      <p style={{ color: error ? '#b91c1c' : 'inherit' }}>
        {message}
      </p>
    </div>
  );
}
