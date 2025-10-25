// Componente reutilizable para estados de carga y error
export default function Loading({ message, error = false, icon = 'hourglass_empty' }) {
    return (
        <div className="loading">
            <span 
                className="material-symbols-outlined" 
                style={{ fontSize: '3rem', color: error ? 'var(--color-primary)' : 'var(--color-primary)' }}
            >
                {icon}
            </span>
            <p style={{ color: error ? 'var(--color-primary)' : 'inherit' }}>
                {message}
            </p>
        </div>
    );
}
