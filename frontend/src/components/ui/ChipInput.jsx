import { useState, useRef } from 'react';

export default function ChipInput({ label, placeholder, values = [], onChange, max = 50 }) {
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const normalize = (s) => s.trim().replace(/\s+/g, ' ');
  const exists = (v) => values.map(x => x.toLowerCase()).includes(v.toLowerCase());

  const addMany = (arr) => {
    const cleaned = arr
      .map(normalize)
      .filter(Boolean)
      .filter(v => !exists(v));

    if (!cleaned.length) return;

    const slots = Math.max(0, max - values.length);
    const next = cleaned.slice(0, slots);
    if (next.length) onChange([...values, ...next]);
  };

  const add = (val) => {
    const v = normalize(val);
    if (!v) return;
    if (exists(v)) return;
    if (values.length >= max) return;
    onChange([...values, v]);
    setInput('');
  };

  const remove = (val) => onChange(values.filter(x => x !== val));

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
    } else if (e.key === 'Backspace' && !input && values.length) {
      remove(values[values.length - 1]);
    }
  };

  const onPaste = (e) => {
    const txt = e.clipboardData.getData('text');
    const parts = txt.split(/,|\n|;/g);
    if (parts.length > 1) {
      e.preventDefault();
      addMany(parts);
      setInput('');
    }
  };

  return (
    <div className="field">
      <label className="label">{label}</label>

      <div
        className="chip-input"
        role="application"
        aria-describedby={max ? 'chip-counter' : undefined}
        onClick={() => listRef.current?.querySelector('input')?.focus()}
      >
        <div
          className="chip-list"
          ref={listRef}
          role="listbox"
          aria-label={label}
        >
          {values.map((v) => (
            <span className="chip-pill" role="option" aria-selected="true" key={v} title={v}>
              <span>{v}</span>
              <button
                type="button"
                className="chip-remove"
                onClick={() => remove(v)}
                aria-label={`Quitar ${v}`}
                title="Quitar"
              >
                ×
              </button>
            </span>
          ))}

          <input
            className="chip-text"
            value={input}
            inputMode="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            placeholder={placeholder}
            aria-label={`${label} input`}
          />
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => add(input)}
          disabled={!input.trim() || values.length >= max}
          aria-label="Agregar chip"
        >
          Agregar
        </button>
      </div>

      <div className="hint" id="chip-counter">
        <span className="chip-counter">{values.length}/{max}</span> • Presiona Enter o coma para crear un chip
      </div>
    </div>
  );
}
