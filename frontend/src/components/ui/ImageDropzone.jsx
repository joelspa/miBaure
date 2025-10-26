import { useRef, useState, useEffect } from 'react';

const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function ImageDropzone({ label = 'Imagen principal', onFileSelected, preview, setPreview, currentImage }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const setBlobPreview = (file) => {
    const url = URL.createObjectURL(file);
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(url);
  };

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file) return;

    if (!/^image\//.test(file.type)) {
      alert('Solo se permiten imágenes.');
      return;
    }
    if (file.size > MAX_BYTES) {
      alert(`La imagen supera ${MAX_MB}MB.`);
      return;
    }

    onFileSelected(file);
    setBlobPreview(file);
  };

  const clearImage = () => {
    onFileSelected(null);
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  // Show preview if we have one, otherwise show current image, otherwise show placeholder
  const displayImage = preview || currentImage;

  return (
    <div className="field">
      <label className="label">{label}</label>

      <div
        className={`dropzone ${dragOver ? 'dropzone-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        aria-label="Subir imagen arrastrando o haciendo click"
      >
        {displayImage ? (
          <div className="dropzone-preview-wrap">
            <img src={displayImage} alt="Vista previa" className="dropzone-preview" />
            <div className="dropzone-actions" aria-hidden="false">
              <button
                type="button"
                className="dropzone-btn"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                title="Reemplazar imagen"
              >
                Reemplazar
              </button>
              <button
                type="button"
                className="dropzone-btn"
                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                title="Quitar imagen"
              >
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <div className="dropzone-placeholder">
            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>image</span>
            <p>Arrastra una imagen o haz click para seleccionar</p>
            <small>JPG, PNG o WEBP. Máx {MAX_MB}MB</small>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
