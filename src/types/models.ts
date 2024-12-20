export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
  description: string;
  category: string;
  isEnabled: boolean;
  contextLength: number;
  costPer1kTokens: number;
}

export interface ModelCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface ModelUsage {
  modelId: string;
  userId: string;
  timestamp: number;
  tokensUsed: number;
  cost: number;
}