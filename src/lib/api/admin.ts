import { apiClient } from './client';
import type { ApiKeyConfig } from '../../types/auth';
import type { UsageStats } from '../../types/usage';

export const adminApi = {
  // API Keys
  getApiKeys: () => apiClient.get<ApiKeyConfig[]>('/api-keys'),
  createApiKey: (data: Partial<ApiKeyConfig>) => 
    apiClient.post<ApiKeyConfig>('/api-keys', data),
  deleteApiKey: (id: string) => apiClient.delete(`/api-keys/${id}`),

  // Usage Statistics
  getUsageStats: (params: { startDate: string; endDate: string }) =>
    apiClient.get<UsageStats[]>(`/usage/stats?${new URLSearchParams(params)}`),
};