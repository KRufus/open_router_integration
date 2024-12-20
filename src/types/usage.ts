export interface UsageStats {
  modelId: string;
  modelName: string;
  date: string;
  totalTokens: number;
  totalCost: number;
}

export interface DailyUsage {
  date: string;
  usage: {
    [modelId: string]: {
      tokens: number;
      cost: number;
    };
  };
}