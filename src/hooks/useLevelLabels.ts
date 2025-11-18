import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseLevelLabelsResult {
  levelLabels: string[];
  isLoading: boolean;
  error: string | null;
}

export const useLevelLabels = (): UseLevelLabelsResult => {
  const [levelLabels, setLevelLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevelLabels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/dashboard/level-labels');
        setLevelLabels(response.data.levelLabels || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch level labels:', err);
        setError('Failed to load level labels');
        setLevelLabels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevelLabels();
  }, []);

  return { levelLabels, isLoading, error };
};
