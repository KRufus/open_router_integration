import type { ApiKeyConfig } from '../types/auth';
import type { LLMModel, ModelUsage } from '../types/models';

export async function fetchApiKeys(): Promise<ApiKeyConfig[]> {
  // Implementation would connect to your backend
  return [];
}

export async function createApiKey(data: Partial<ApiKeyConfig>): Promise<ApiKeyConfig> {
  // Implementation would connect to your backend
  return {} as ApiKeyConfig;
}

export async function fetchModels(): Promise<LLMModel[]> {
  // Implementation would connect to your backend
  return [];
}

export async function updateModel(id: string, data: Partial<LLMModel>): Promise<LLMModel> {
  // Implementation would connect to your backend
  return {} as LLMModel;
}

export async function fetchUsageStats(dateRange: string): Promise<ModelUsage[]> {
  // Implementation would connect to your backend
  return [];
}