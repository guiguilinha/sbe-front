// WebSocket temporariamente desabilitado
// import { useEffect, useRef, useCallback } from 'react';
// import { websocketService } from '../services/websocket.service';

export const useWebSocket = (collection: string, _onUpdate?: (data: any) => void) => {
  // WebSocket temporariamente desabilitado
  console.log('🚫 useWebSocket desabilitado temporariamente para collection:', collection);
  
  return {
    isConnected: false,
    stats: { isConnected: false, reconnectAttempts: 0 }
  };
};

// Hook para múltiplas collections
export const useWebSocketMulti = (collections: string[], _onUpdate?: (collection: string, data: any) => void) => {
  // WebSocket temporariamente desabilitado
  console.log('🚫 useWebSocketMulti desabilitado temporariamente para collections:', collections);
  
  return {
    isConnected: false,
    stats: { isConnected: false, reconnectAttempts: 0 }
  };
};
