import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import type { ApiKeyConfig } from '../../types/auth';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApiKeys() {
      try {
        const data = await adminApi.getApiKeys();
        setApiKeys(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch API keys');
      } finally {
        setLoading(false);
      }
    }

    fetchApiKeys();
  }, []);

  const createApiKey = async (data: Partial<ApiKeyConfig>) => {
    try {
      const newKey = await adminApi.createApiKey(data);
      setApiKeys(prev => [...prev, newKey]);
      return newKey;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create API key');
    }
  };

  return {
    apiKeys,
    loading,
    error,
    createApiKey,
  };
}