export interface MapRegion {
  "map-region-title": string; // Nome da região = id do path
  "map-region-city-title": string; // Nome de uma das cidades da região
  "map-region-phone-number": string; // Número de telefone da cidade
}

export interface MapSection {
  "map-title": string; // Título da sessão
  "map-content": string; // Descrição da sessão
  "map-regions": MapRegion[];
}

export interface MapRegionsMGProps {
  "map-title": string;
  "map-content": string;
  regions: MapRegion[];
} 