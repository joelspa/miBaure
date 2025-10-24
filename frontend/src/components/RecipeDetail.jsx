import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/recipes/${id}`)
            .then(res => {
                setRecipe(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Cargando receta...</div>;
    if (!recipe) return <div className="loading" style={{ color: '#e74c3c' }}>Receta no encontrada</div>;

    return (
        <div className="recipe-detail">
            <Link to="/" className="back-link">← Volver a la lista de recetas</Link>
            
            <h1>{recipe.name}</h1>
            {recipe.baureName && <h2>{recipe.baureName}</h2>}
            
            <section>
                <h3>📖 Descripción</h3>
                <p style={{ lineHeight: '1.8', color: '#555' }}>{recipe.description}</p>
            </section>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <section>
                    <h3>🥘 Ingredientes</h3>
                    <ul>
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h3>👨‍🍳 Preparación</h3>
                <p style={{ lineHeight: '1.8', color: '#555' }}>{recipe.preparation}</p>
            </section>

            {recipe.utensils && recipe.utensils.length > 0 && (
                <section>
                    <h3>🔪 Utensilios</h3>
                    <ul>
                        {recipe.utensils.map((utensil, index) => (
                            <li key={index}>{utensil}</li>
                        ))}
                    </ul>
                </section>
            )}

            {recipe.consumption && (
                <section>
                    <h3>🍽️ Consumo</h3>
                    <p style={{ lineHeight: '1.8', color: '#555' }}>{recipe.consumption}</p>
                </section>
            )}

            {recipe.conservation && (
                <section>
                    <h3>❄️ Conservación</h3>
                    <p style={{ lineHeight: '1.8', color: '#555' }}>{recipe.conservation}</p>
                </section>
            )}

            {recipe.sourcePerson && (
                <section style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                    <h3>📝 Fuente</h3>
                    <p style={{ fontStyle: 'italic', color: '#667eea', margin: 0 }}>{recipe.sourcePerson}</p>
                </section>
            )}
        </div>
    );
}

export default RecipeDetail;