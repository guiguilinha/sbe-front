import React from 'react';
import type { MapRegionsMGProps } from '../../../types';
import { MAP_REGIONS, getAllRegionNames } from './MapData';
import { useMapInteraction } from './useMapInteraction';
import MapRegion from './MapRegion';
import MapDialog from './MapDialog';

const MGMap: React.FC<MapRegionsMGProps> = ({ 
  "map-title": mapTitle = "Encontre o Sebrae mais próximo de você", 
  "map-content": mapContent = "Entre em contato com o Sebrae da sua região para obter orientações personalizadas para o seu negócio.",
  regions = []
}) => {
  const { selectedRegion, handleRegionClick, handleCloseDialog } = useMapInteraction(regions);

  return (
    <section id="mapa-mg" className="w-full py-16 bg-slate-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto p-8 mb-0 md:mb-10 lg:mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          {mapTitle}
        </h2>
        <p className="text-gray-600 mb-4">
          {mapContent}
        </p>
      </div>

      {/* SVG Map */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center">
        <svg
          viewBox="0 0 855 663"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ maxWidth: "100%", height: "auto" }}
        >
          {/* Renderizar todas as regiões usando o componente MapRegion */}
          {getAllRegionNames().map((regionName) => {
            const regionData = MAP_REGIONS[regionName];
            if (!regionData) {
              console.warn(`Dados não encontrados para região: ${regionName}`);
              return null;
            }

            return (
              <MapRegion
                key={regionName}
                regionData={regionData}
                onClick={handleRegionClick}
              />
            );
          })}
        </svg>
      </div>

      {/* Dialog */}
      <MapDialog 
        region={selectedRegion} 
        onClose={handleCloseDialog}
        allRegions={regions}
      />
    </section>
  );
};

export default MGMap; 