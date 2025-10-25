import { useState, useEffect } from 'react';
import apiService from '../services/api.service';
import Loading from './Loading';
import { ERROR_MESSAGES, LOADING_MESSAGES, PLACEHOLDERS } from '../config/constants';

export default function LifeStories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiService.getAllStories()
            .then(response => {
                setStories(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar recuentos:', err);
                setError(ERROR_MESSAGES.LOAD_STORIES);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="content-wrapper">
                <div className="page-container">
                    <Loading message={LOADING_MESSAGES.STORIES} />
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
                        history_edu
                    </span>
                    <h1 className="page-title">Recuentos de Vida</h1>
                    <p className="page-description">
                        Historias y testimonios de la comunidad Baure
                    </p>
                </div>

                <div className="stories-content">
                    {stories.length === 0 ? (
                        <Loading message={PLACEHOLDERS.NO_STORIES} />
                    ) : (
                        <div className="stories-grid">
                            {stories.map((story) => (
                                <article key={story._id} className="story-card">
                                    {story.photoUrl && (
                                        <div className="story-image">
                                            <img 
                                                src={story.photoUrl} 
                                                alt={story.personName}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="story-content">
                                        <h2 className="story-title">{story.title}</h2>
                                        <div className="story-meta">
                                            <span className="material-symbols-outlined">person</span>
                                            <span className="story-person">
                                                {story.personName}
                                                {story.age && `, ${story.age} años`}
                                            </span>
                                        </div>
                                        {story.community && (
                                            <div className="story-meta">
                                                <span className="material-symbols-outlined">location_on</span>
                                                <span>{story.community}</span>
                                            </div>
                                        )}
                                        <p className="story-text">{story.story}</p>
                                        {story.relatedThemes && story.relatedThemes.length > 0 && (
                                            <div className="story-themes">
                                                {story.relatedThemes.map((theme, index) => (
                                                    <span key={index} className="chip chip-secondary">
                                                        {theme}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
