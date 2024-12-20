export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model: string;
  timestamp: number;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
}