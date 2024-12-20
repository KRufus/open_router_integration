import { apiClient } from './client';
import type { Message, ChatResponse } from '../../types/chat';

export const chatApi = {
  sendMessage: (modelId: string, messages: Message[]) =>
    apiClient.post<ChatResponse>('/chat', {
      modelId,
      messages,
    }),
};