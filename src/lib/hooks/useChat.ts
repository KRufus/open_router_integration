import { useState, useCallback } from 'react';
import { chatApi } from '../api/chat';
import type { Message } from '../../types/chat';

export function useChat(modelId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!modelId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      model: modelId,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatApi.sendMessage(modelId, [...messages, userMessage]);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response.content,
        role: 'assistant',
        model: modelId,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [modelId, messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages: () => setMessages([]),
  };
}