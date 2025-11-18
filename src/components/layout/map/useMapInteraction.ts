import { useState, useCallback } from 'react';
import type { MapRegion } from '../../../types/map';

// Mapeamento: MapData ID -> Backend Region Title
const regionMapping: Record<string, string> = {
  "Noroeste": "Noroeste e Alto do Paranaíba",
  "Centro": "Centro",
  "Norte": "Norte",
  "Sul": "Sul",
  "Centro-oeste": "Centro-oeste e Sudoeste",
  "Rio-doce": "Rio Doce e Vale do Aço",
  "Zona-da-mata": "Zona da Mata e Vertentes",
  "Jequitinhonha": "Jequitinhonha e Mucuri",
  "Triangulo": "Triângulo"
};

export const useMapInteraction = (regions: MapRegion[]) => {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);

  const handleRegionClick = useCallback((regionId: string) => {
    console.log('🔍 useMapInteraction - Clique na região:', regionId);
    
    if (!Array.isArray(regions)) {
      console.error("Prop 'regions' está indefinida ou não é um array!", regions);
      return;
    }

    // Mapear o ID do MapData para o título do backend
    const backendRegionTitle = regionMapping[regionId];
    
    if (!backendRegionTitle) {
      console.warn(`Mapeamento não encontrado para região: ${regionId}`);
      return;
    }

    const region = regions.find(r => r["map-region-title"] === backendRegionTitle);
    
    if (!region) {
      console.warn(`Região não encontrada: ${backendRegionTitle}`, regions.map(r => r["map-region-title"]));
      return;
    }

    console.log('✅ useMapInteraction - Região encontrada:', region);
    setSelectedRegion(region);
  }, [regions]);

  const handleCloseDialog = useCallback(() => {
    console.log('🔍 useMapInteraction - Fechando dialog');
    setSelectedRegion(null);
  }, []);

  return {
    selectedRegion,
    handleRegionClick,
    handleCloseDialog,
    setSelectedRegion
  };
}; 