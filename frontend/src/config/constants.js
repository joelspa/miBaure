// Configuración del proyecto
export const API_URL = import.meta.env.VITE_API_URL;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
    LOAD_RECIPES: 'Error al cargar las recetas. Asegúrate de que el backend esté corriendo.',
    LOAD_STORIES: 'No se pudieron cargar los recuentos de vida',
    LOAD_CULTURAL: 'No se pudieron cargar los datos culturales',
    AI_CONNECTION: 'Error al conectar con el asistente.',
    RECIPE_NOT_FOUND: 'Receta no encontrada'
};

// Mensajes de carga
export const LOADING_MESSAGES = {
    RECIPES: 'Cargando recetas tradicionales...',
    RECIPE: 'Preparando la receta...',
    STORIES: 'Cargando historias de nuestra gente...',
    CULTURAL: 'Cargando sabiduría Baure...',
    AI: 'Generando respuesta...'
};

// Placeholders
export const PLACEHOLDERS = {
    NO_RECIPES: 'No se encontraron recetas',
    NO_STORIES: 'No hay recuentos de vida disponibles. Ejecuta el seed para agregar datos.',
    NO_CULTURAL: 'No hay datos culturales disponibles en esta categoría. Ejecuta el seed para agregar datos.',
    SEARCH_RECIPE: 'Buscar por nombre, ingrediente o palabra clave...',
    ASK_AI: 'Escribe tu pregunta sobre esta receta...'
};

// Categorías de cultura
export const CULTURAL_CATEGORIES = [
    { value: 'all', label: 'Todas', icon: 'grid_view' },
    { value: 'Historia', label: 'Historia', icon: 'history' },
    { value: 'Tradiciones', label: 'Tradiciones', icon: 'auto_stories' },
    { value: 'Lengua', label: 'Lengua', icon: 'translate' },
    { value: 'Territorio', label: 'Territorio', icon: 'landscape' },
    { value: 'Cocina', label: 'Cocina', icon: 'restaurant_menu' }
];
