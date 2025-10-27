import { z } from 'zod';

// Esquema de validación para datos culturales
export const culturalDataSchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(150, 'El título no puede exceder 150 caracteres'),
  
  category: z
    .string()
    .min(3, 'La categoría debe tener al menos 3 caracteres')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
  
  content: z
    .string()
    .min(20, 'El contenido debe tener al menos 20 caracteres')
    .max(3000, 'El contenido no puede exceder 3000 caracteres'),
  
  source: z
    .string()
    .optional()
    .or(z.literal('')),
  
  tags: z
    .array(z.string())
    .optional()
    .default([]),
});

// Función helper para validar un campo específico
export const validateCulturalDataField = (field, value) => {
  try {
    // No validar si el campo está vacío (permitir escribir libremente)
    if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    const fieldSchema = culturalDataSchema.shape[field];
    if (!fieldSchema) return null;
    
    fieldSchema.parse(value);
    return null; // Sin errores
  } catch (error) {
    if (error instanceof z.ZodError && error.errors && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return null; // No mostrar error si algo sale mal
  }
};

// Función helper para validar todo el formulario
export const validateCulturalDataForm = (formData) => {
  try {
    culturalDataSchema.parse(formData);
    return { isValid: true, errors: {} };
  } catch (error) {
    // Siempre intentar procesar errores de Zod
    if (error && error.issues && Array.isArray(error.issues)) {
      const errors = {};
      error.issues.forEach((issue) => {
        const field = issue.path && issue.path[0];
        if (field && issue.message) {
          errors[field] = issue.message;
        }
      });
      return { isValid: false, errors };
    }
    // Fallback para formato antiguo de Zod
    if (error && error.errors && Array.isArray(error.errors)) {
      const errors = {};
      error.errors.forEach((err) => {
        const field = err.path && err.path[0];
        if (field && err.message) {
          errors[field] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    console.error('Validation error:', error);
    return { isValid: false, errors: {} };
  }
};
