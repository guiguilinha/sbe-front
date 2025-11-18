export {};

declare global {
  interface Window {
    Keycloak?: any; // se teu script expõe isso; opcional
  }
}
