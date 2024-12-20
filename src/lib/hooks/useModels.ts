import { useState, useEffect } from 'react';
import { modelsApi } from '../api/models';
import type { LLMModel } from '../../types/models';

export function useModels() {
  const [models, setModels] = useState<LLMModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await modelsApi.getModels();
        setModels(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch models');
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  return { models, loading, error };
}