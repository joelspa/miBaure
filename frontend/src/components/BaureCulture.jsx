import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/api.service';
import Loading from './Loading';
import { ERROR_MESSAGES, LOADING_MESSAGES, PLACEHOLDERS, CULTURAL_CATEGORIES } from '../config/constants';

export default function BaureCulture() {
    const [culturalData, setCulturalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

    const handleDelete = async (item) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar "${item.title}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await apiService.deleteCulturalData(item._id);
            setCulturalData(culturalData.filter(cd => cd._id !== item._id));
            alert('Dato cultural eliminado con éxito');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar el dato cultural: ' + (err.response?.data?.message || err.message));
        }
    };

    useEffect(() => {
        apiService.getAllCulturalData()
            .then(response => {
                setCulturalData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar datos culturales:', err);
                setError(ERROR_MESSAGES.LOAD_CULTURAL);
                setLoading(false);
            });
    }, []);

    const filteredData = selectedCategory === 'all' 
        ? culturalData 
        : culturalData.filter(item => item.category === selectedCategory);

    if (loading) {
        return (
            <div className="content-wrapper">
                <div className="page-container">
                    <Loading message={LOADING_MESSAGES.CULTURAL} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="content-wrapper">
                <div className="page-container">
                    <Loading message={error} error={true} />
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            <div className="page-container">
                <div className="page-header">
                    <span className="material-symbols-outlined hero-icon">
                        account_balance
                    </span>
                    <h1 className="page-title">Cultura Baure</h1>
                    <p className="page-description">
                        Datos históricos, tradiciones y conocimientos de la cultura Baure
                    </p>
                </div>

                {/* Filtros por categoría */}
                <div className="category-filters">
                    {CULTURAL_CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            className={selectedCategory === cat.value ? 'tag tag-primary' : 'tag'}
                            onClick={() => setSelectedCategory(cat.value)}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                                {cat.icon}
                            </span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="culture-content">
                    {filteredData.length === 0 ? (
                        <Loading message={PLACEHOLDERS.NO_CULTURAL} />
                    ) : (
                        <div className="cultural-articles">
                            {filteredData.map((item) => (
                                <article key={item._id} className="cultural-article">
                                    <div className="cultural-header">
                                        <span className="cultural-category">{item.category}</span>
                                        <h2 className="cultural-title">{item.title}</h2>
                                    </div>
                                    
                                    <div className="cultural-main-content">
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </div>

                                    {item.subsections && item.subsections.length > 0 && (
                                        <div className="cultural-subsections">
                                            {item.subsections.map((subsection, index) => (
                                                <div key={index} className="subsection">
                                                    <h3 className="subsection-title">{subsection.subtitle}</h3>
                                                    <p className="subsection-text">{subsection.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {item.images && item.images.length > 0 && (
                                        <div className="cultural-images">
                                            {item.images.map((image, index) => (
                                                <figure key={index} className="cultural-image">
                                                    <img 
                                                        src={image.url} 
                                                        alt={image.caption || `Imagen ilustrativa de ${item.title}, categoría ${item.category} de la cultura Baure`}
                                                        loading="lazy"
                                                        width="600"
                                                        height="400"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                    {image.caption && (
                                                        <figcaption>{image.caption}</figcaption>
                                                    )}
                                                </figure>
                                            ))}
                                        </div>
                                    )}

                                    {item.relatedTopics && item.relatedTopics.length > 0 && (
                                        <div className="cultural-topics">
                                            <span className="topics-label">Temas relacionados:</span>
                                            {item.relatedTopics.map((topic, index) => (
                                                <span key={index} className="tag tag-accent">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {isAdmin && (
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                            <Link 
                                                to={`/cultura/${item._id}/edit`} 
                                                className="btn btn-outline"
                                                style={{ flex: 1 }}
                                            >
                                                <span className="material-symbols-outlined">edit</span>
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="btn btn-outline"
                                                style={{ flex: 1, color: 'var(--color-error, #dc2626)' }}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
