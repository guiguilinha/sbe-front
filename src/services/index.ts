// Exportar cliente API base
export { default as api } from './api';
export type { ApiResponse, ApiError } from './api';

// Serviços da Home Page
export * from './homeService';

// Serviços da Quiz Page
export * from './quizService';

// Serviços temporários (serão substituídos quando implementarmos as páginas)
export * from './results/resultsService';

// Novos serviços serão adicionados aqui conforme forem criados 