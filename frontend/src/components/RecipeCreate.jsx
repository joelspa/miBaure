import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import TagInput from './ui/TagInput';
import ImageDropzone from './ui/ImageDropzone';

export default function RecipeCreate() {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'El nombre es obligatorio.';
    if (ingredients.length === 0) e.ingredients = 'Agrega al menos un ingrediente.';
    if (!preparation.trim()) e.preparation = 'Describe los pasos de preparación.';
    setErrors(e);
    return Object.keys(e).length === 0;
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

      // Enviamos arrays como keys repetidas para máxima compatibilidad
      ingredients.forEach(i => fd.append('ingredients', i));
      utensils.forEach(u => fd.append('utensils', u));
      tags.forEach(t => fd.append('tags', t));

      if (file) fd.append('image', file);

      const res = await apiService.createRecipe(fd, (evt) => {
        if (!evt.total) return;
        const p = Math.round((evt.loaded * 100) / evt.total);
        setProgress(p);
      });

      setToast({ type: 'success', text: 'Receta creada con éxito' });
      // Navegar al detalle
      navigate(`/recipe/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', text: err.response?.data?.message || 'No se pudo crear la receta' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="page-container">
        <div className="page-header">
          <span className="material-symbols-outlined hero-icon">add_circle</span>
          <h1 className="page-title">Crear receta</h1>
          <p className="page-description">Completa el formulario y sube una imagen principal.</p>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <div className="grid-2">
            <div>
              <div className="field">
                <label className="label">Nombre *</label>
                <input
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masaco de yuca"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="field">
                <label className="label">Nombre en baure</label>
                <input
                  className="input"
                  value={baureName}
                  onChange={(e) => setBaureName(e.target.value)}
                  placeholder="Tunu Masako"
                />
              </div>

              <div className="field">
                <label className="label">Descripción</label>
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Plato tradicional con yuca y queso…"
                />
              </div>

              <TagInput
                label="Ingredientes *"
                placeholder="Ej. yuca"
                values={ingredients}
                onChange={setIngredients}
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
              />

              <div className="field">
                <label className="label">Preparación *</label>
                <textarea
                  className={`textarea ${errors.preparation ? 'input-error' : ''}`}
                  value={preparation}
                  onChange={(e) => setPreparation(e.target.value)}
                  rows={6}
                  placeholder="Rallar yuca, mezclar con queso, dorar…"
                />
                {errors.preparation && <p className="error">{errors.preparation}</p>}
              </div>

              <div className="field">
                <label className="label">Consumo</label>
                <input
                  className="input"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  placeholder="Consumir caliente"
                />
              </div>

              <div className="field">
                <label className="label">Conservación</label>
                <input
                  className="input"
                  value={conservation}
                  onChange={(e) => setConservation(e.target.value)}
                  placeholder="Refrigerar hasta 24h"
                />
              </div>

              <div className="field">
                <label className="label">Fuente</label>
                <input
                  className="input"
                  value={sourcePerson}
                  onChange={(e) => setSourcePerson(e.target.value)}
                  placeholder='Relato de: Adil Arredondo'
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
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <span className="material-symbols-outlined">save</span>
              {submitting ? 'Guardando…' : 'Crear receta'}
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
