export type Role = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface ApiKeyConfig {
  id: string;
  name: string;
  key: string;
  provider: string;
  createdAt: number;
  usageLimit: number;
  currentUsage: number;
}