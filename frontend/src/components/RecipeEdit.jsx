import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import TagInput from './ui/TagInput';
import ImageDropzone from './ui/ImageDropzone';
import Loading from './Loading';
import { useAuth } from '../hooks/useAuth';
import { validateRecipeField, validateRecipeForm } from '../schemas/recipeSchema';

export default function RecipeEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [baureName, setBaureName] = useState('');
  const [description, setDescription] = useState('');
  const [preparation, setPreparation] = useState('');
  const [consumption, setConsumption] = useState('');
  const [conservation, setConservation] = useState('');
  const [sourcePerson, setSourcePerson] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [tags, setTags] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await apiService.getRecipeById(id);
        const recipe = res.data;
        
        setName(recipe.name || '');
        setBaureName(recipe.baureName || '');
        setDescription(recipe.description || '');
        setPreparation(recipe.preparation || '');
        setConsumption(recipe.consumption || '');
        setConservation(recipe.conservation || '');
        setSourcePerson(recipe.sourcePerson || '');
        setIngredients(recipe.ingredients || []);
        setUtensils(recipe.utensils || []);
        setTags(recipe.tags || []);
        setCurrentImage(recipe.imageUrl || null);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setToast({ type: 'error', text: 'No se pudo cargar la receta' });
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Validación en tiempo real con Zod
  const validateField = (field, value) => {
    const error = validateRecipeField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validate = () => {
    const formData = {
      name: name.trim(),
      description: description.trim(),
      ingredients,
      instructions: preparation.trim(),
      category: '',
      tags,
    };

    const { isValid, errors: validationErrors } = validateRecipeForm(formData);
    setErrors(validationErrors);
    return isValid;
  };

  const isFormValid = () => {
    // Solo verificar que los campos obligatorios no estén completamente vacíos
    return name.trim() && description.trim() && ingredients.length > 0 && preparation.trim();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setToast(null);

      const fd = new FormData();
      fd.append('name', name);
      if (baureName) fd.append('baureName', baureName);
      if (description) fd.append('description', description);
      if (preparation) fd.append('preparation', preparation);
      if (consumption) fd.append('consumption', consumption);
      if (conservation) fd.append('conservation', conservation);
      if (sourcePerson) fd.append('sourcePerson', sourcePerson);

      ingredients.forEach(i => fd.append('ingredients', i));
      utensils.forEach(u => fd.append('utensils', u));
      tags.forEach(t => fd.append('tags', t));

      if (file) fd.append('image', file);

      await apiService.updateRecipe(id, fd, (evt) => {
        if (!evt.total) return;
        const p = Math.round((evt.loaded * 100) / evt.total);
        setProgress(p);
      });

      setToast({ type: 'success', text: 'Receta actualizada con éxito' });
      setTimeout(() => navigate(`/recipe/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo actualizar la receta' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Mostrar loading mientras verifica autenticación
  if (authLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // Si no está autenticado, useAuth ya redirigió a /admin
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper">
      <div className="page-container">
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon">edit</span>
          <h1 className="page-title">Editar receta</h1>
          <p className="page-description">Actualiza la información de la receta.</p>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <div className="grid-2">
            <div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateField('name', e.target.value);
                  }}
                  onBlur={(e) => validateField('name', e.target.value)}
                  placeholder="Masaco de yuca (3-100 caracteres)"
                  autoComplete="off"
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <small className="field-hint">
                  {name.length}/100 caracteres
                </small>
              </div>

              <div className="field">
                <label className="label">Nombre en baure</label>
                <input
                  className="input"
                  value={baureName}
                  onChange={(e) => setBaureName(e.target.value)}
                  placeholder="Tunu Masako"
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label className="label">Descripción *</label>
                <textarea
                  className={`textarea ${errors.description ? 'input-error' : ''}`}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    validateField('description', e.target.value);
                  }}
                  onBlur={(e) => validateField('description', e.target.value)}
                  rows={3}
                  placeholder="Plato tradicional con yuca y queso… (mínimo 10 caracteres)"
                  autoComplete="off"
                />
                {errors.description && <p className="error">{errors.description}</p>}
                <small className="field-hint">
                  {description.length}/500 caracteres
                </small>
              </div>

              <TagInput
                label="Ingredientes *"
                placeholder="Ej. yuca"
                values={ingredients}
                onChange={(newIngredients) => {
                  setIngredients(newIngredients);
                  validateField('ingredients', newIngredients);
                }}
              />
              {errors.ingredients && <p className="error">{errors.ingredients}</p>}

              <TagInput
                label="Utensilios"
                placeholder="Ej. rallador"
                values={utensils}
                onChange={setUtensils}
              />

              <TagInput
                label="Etiquetas"
                placeholder="Ej. Tradicional"
                values={tags}
                onChange={setTags}
              />
            </div>

            <div>
              <ImageDropzone
                label="Imagen principal"
                onFileSelected={setFile}
                preview={preview}
                setPreview={setPreview}
                currentImage={currentImage}
              />

              <div className="field">
                <label className="label">Preparación *</label>
                <textarea
                  className={`textarea ${errors.instructions ? 'input-error' : ''}`}
                  value={preparation}
                  onChange={(e) => {
                    setPreparation(e.target.value);
                    validateField('instructions', e.target.value);
                  }}
                  onBlur={(e) => validateField('instructions', e.target.value)}
                  rows={6}
                  placeholder="Rallar yuca, mezclar con queso, dorar… (mínimo 20 caracteres)"
                  autoComplete="off"
                />
                {errors.instructions && <p className="error">{errors.instructions}</p>}
                <small className="field-hint">
                  {preparation.length}/2000 caracteres
                </small>
              </div>

              <div className="field">
                <label className="label">Consumo</label>
                <input
                  className="input"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  placeholder="Consumir caliente"
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label className="label">Conservación</label>
                <input
                  className="input"
                  value={conservation}
                  onChange={(e) => setConservation(e.target.value)}
                  placeholder="Refrigerar hasta 24h"
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label className="label">Fuente</label>
                <input
                  className="input"
                  value={sourcePerson}
                  onChange={(e) => setSourcePerson(e.target.value)}
                  placeholder='Relato de: Adil Arredondo'
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {submitting && (
            <div className="progress">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting || !isFormValid()}
            >
              <span className="material-symbols-outlined">save</span>
              {submitting ? 'Guardando…' : 'Actualizar receta'}
            </button>
          </div>

          {toast && (
            <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              <span className="material-symbols-outlined">
                {toast.type === 'error' ? 'error' : 'check_circle'}
              </span>
              {toast.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
