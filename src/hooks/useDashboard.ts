import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboard/dashboardService';
import type { DashboardResponse } from '@/types/contracts/dashboard.types';

type State =
  | { isLoading: true; error: null; data: null }
  | { isLoading: false; error: Error; data: null }
  | { isLoading: false; error: null; data: DashboardResponse };

export function useDashboard(): State {
  const [state, setState] = useState<State>({ isLoading: true, error: null, data: null });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await dashboardService.getDashboard();
        if (alive) setState({ isLoading: false, error: null, data });
      } catch (err) {
        if (alive) setState({ isLoading: false, error: err as Error, data: null });
      }
    })();
    return () => { alive = false; };
  }, []);

  return state;
}
