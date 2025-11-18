import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../../ui/dialog';
import type { MapRegion } from '../../../types/map';

interface MapDialogProps {
  region: MapRegion | null;
  onClose: () => void;
  allRegions: MapRegion[];
}

const MapDialog: React.FC<MapDialogProps> = ({ region, onClose, allRegions }) => {
  if (!region) return null;

  // Filtrar todas as cidades/telefones da mesma região
  const regionCities = allRegions.filter(r => 
    r["map-region-title"] === region["map-region-title"]
  );

  console.log('🔍 MapDialog - Região selecionada:', region["map-region-title"]);
  console.log('🔍 MapDialog - Cidades encontradas:', regionCities.length);
  console.log('🔍 MapDialog - Dados das cidades:', regionCities);

  return (
    <Dialog open={!!region} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {region["map-region-title"]}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Entre em contato com o Sebrae da sua região:
          </p>
          <div className="text-xs text-muted-foreground mb-2">
            {regionCities.length} {regionCities.length === 1 ? 'cidade' : 'cidades'} encontrada{regionCities.length === 1 ? '' : 's'}
          </div>
          <div className="space-y-2">
            {regionCities.map((cityData, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                <span className="font-medium text-sm">
                  {cityData["map-region-city-title"]}:
                </span>
                <span className="text-sm font-mono">
                  {cityData["map-region-phone-number"]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog; 