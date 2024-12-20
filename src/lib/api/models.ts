import { apiClient } from './client';
import type { LLMModel, ModelCategory } from '../../types/models';

export const modelsApi = {
  getModels: () => apiClient.get<LLMModel[]>('/models'),
  getCategories: () => apiClient.get<ModelCategory[]>('/models/categories'),
  createModel: (model: Partial<LLMModel>) => apiClient.post<LLMModel>('/models', model),
  updateModel: (id: string, model: Partial<LLMModel>) => 
    apiClient.put<LLMModel>(`/models/${id}`, model),
  deleteModel: (id: string) => apiClient.delete(`/models/${id}`),
};