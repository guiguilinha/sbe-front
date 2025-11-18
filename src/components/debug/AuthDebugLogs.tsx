import React, { useState, useEffect } from 'react';

export function AuthDebugLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedLogs = localStorage.getItem('auth_debug_logs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const clearLogs = () => {
    localStorage.removeItem('auth_debug_logs');
    setLogs([]);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-xs z-50"
      >
        Debug Auth
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg max-w-md max-h-96 overflow-auto z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">Auth Debug Logs</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs bg-gray-600 px-2 py-1 rounded"
        >
          ✕
        </button>
      </div>
      
      <div className="text-xs space-y-1">
        {logs.length === 0 ? (
          <p className="text-gray-400">Nenhum log encontrado</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="border-b border-gray-600 pb-1">
              <div className="text-yellow-400">{log.timestamp}</div>
              <div className="text-green-400">{log.event}</div>
              {log.authenticated !== undefined && (
                <div>Auth: {log.authenticated ? 'true' : 'false'}</div>
              )}
              {log.hasKeycloakInstance !== undefined && (
                <div>Keycloak: {log.hasKeycloakInstance ? 'true' : 'false'}</div>
              )}
            </div>
          ))
        )}
      </div>
      
      <button
        onClick={clearLogs}
        className="mt-2 text-xs bg-red-600 px-2 py-1 rounded"
      >
        Limpar Logs
      </button>
    </div>
  );
}
