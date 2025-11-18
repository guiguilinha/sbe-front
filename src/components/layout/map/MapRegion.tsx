import React from 'react';
import { motion } from 'framer-motion';
import type { RegionData } from './MapData';

interface MapRegionProps {
  regionData: RegionData;
  onClick: (regionId: string) => void;
}

const MapRegion: React.FC<MapRegionProps> = ({ regionData, onClick }) => {
  const handleClick = () => {
    onClick(regionData.id);
  };

  return (
    <>
      {/* Path da região */}
      <motion.path
        id={regionData.id}
        d={regionData.path}
        className={`${regionData.colors.fill} hover:${regionData.colors.hover} transition-colors duration-300 cursor-pointer filter brightness-100 hover:brightness-105 hover:shadow-lg`}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Texto da região */}
      <text
        x={regionData.textPosition.x}
        y={regionData.textPosition.y}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={regionData.textSize}
        fill="oklch(55.4% 0.046 257.417)"
        className="select-none pointer-events-none uppercase sm:text-[14px]"
        onClick={handleClick}
      >
        {regionData.id}
      </text>
    </>
  );
};

export default MapRegion; 