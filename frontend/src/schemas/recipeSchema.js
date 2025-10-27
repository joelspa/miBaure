import { z } from 'zod';

// Esquema de validación para recetas
export const recipeSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  ingredients: z
    .array(z.string())
    .min(1, 'Debe haber al menos 1 ingrediente')
    .max(30, 'No puede haber más de 30 ingredientes'),
  
  instructions: z
    .string()
    .min(20, 'Las instrucciones deben tener al menos 20 caracteres')
    .max(2000, 'Las instrucciones no pueden exceder 2000 caracteres'),
  
  category: z
    .string()
    .optional()
    .or(z.literal('')),
  
  tags: z
    .array(z.string())
    .optional()
    .default([]),
});

// Función helper para validar un campo específico
export const validateRecipeField = (field, value) => {
  try {
    // No validar si el campo está vacío (permitir escribir libremente)
    if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    const fieldSchema = recipeSchema.shape[field];
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
export const validateRecipeForm = (formData) => {
  try {
    recipeSchema.parse(formData);
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
