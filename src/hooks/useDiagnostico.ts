import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboard/dashboardService';
// Update the import path below to the correct module where DiagnosticoDetail is exported
import type { DiagnosticoDetail } from '@/types/contracts/diagnostico.types';

type State =
  | { isLoading: true; error: null; data: null }
  | { isLoading: false; error: Error; data: null }
  | { isLoading: false; error: null; data: DiagnosticoDetail };

export function useDiagnostico(id: string): State {
  const [state, setState] = useState<State>({ isLoading: true, error: null, data: null });

  useEffect(() => {
    if (!id) return;
    let alive = true;
    (async () => {
      try {
        const data = await dashboardService.getDiagnostico(id);
        if (alive) setState({ isLoading: false, error: null, data });
      } catch (err) {
        if (alive) setState({ isLoading: false, error: err as Error, data: null });
      }
    })();
    return () => { alive = false; };
  }, [id]);

  return state;
}
