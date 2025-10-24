import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Obtenemos la URL de la API desde las variables de entorno de Vite
const API_URL = import.meta.env.VITE_API_URL;

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/recipes`)
            .then(res => {
                setRecipes(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Error al cargar las recetas. Asegúrate de que el backend esté corriendo.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Cargando recetas...</div>;
    if (error) return <div className="loading" style={{ color: '#e74c3c' }}>{error}</div>;

    return (
        <div className="recipe-list">
            <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '30px', fontSize: '2rem' }}>
                Descubre las Recetas Tradicionales
            </h2>
            {recipes.map(recipe => (
                <div key={recipe._id} className="recipe-card">
                    <h3>
                        <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
                    </h3>
                    {recipe.baureName && <p className="baure-name">{recipe.baureName}</p>}
                    {recipe.description && (
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            {recipe.description.substring(0, 150)}...
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
export default RecipeList;