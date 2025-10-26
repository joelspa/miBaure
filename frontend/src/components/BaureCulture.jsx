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
                            className={selectedCategory === cat.value ? 'chip chip-primary' : 'chip'}
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
                                                        alt={image.caption}
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
                                                <span key={index} className="chip chip-accent">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {isAdmin && (
                                        <Link 
                                            to={`/cultura/${item._id}/edit`} 
                                            className="btn btn-outline"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                            Editar
                                        </Link>
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
