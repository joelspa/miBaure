import { z } from 'zod';

// Esquema de validación para historias de vida
export const lifeStorySchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(150, 'El título no puede exceder 150 caracteres'),
  
  personName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  story: z
    .string()
    .min(50, 'La historia debe tener al menos 50 caracteres')
    .max(5000, 'La historia no puede exceder 5000 caracteres'),
  
  community: z
    .string()
    .optional()
    .or(z.literal('')),
  
  age: z
    .string()
    .optional()
    .or(z.literal('')),
  
  date: z
    .string()
    .optional()
    .or(z.literal('')),
  
  tags: z
    .array(z.string())
    .optional()
    .default([]),
});

// Función helper para validar un campo específico
export const validateLifeStoryField = (field, value) => {
  try {
    // No validar si el campo está vacío (permitir escribir libremente)
    if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    const fieldSchema = lifeStorySchema.shape[field];
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
export const validateLifeStoryForm = (formData) => {
  try {
    lifeStorySchema.parse(formData);
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
