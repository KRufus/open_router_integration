import { useCallback } from 'react';
import type { Message } from '../types/chat';

export function useChatApi() {
  const sendMessage = useCallback(async (
    modelId: string,
    content: string,
    previousMessages: Message[]
  ) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        modelId,
        messages: previousMessages.concat({
          role: 'user',
          content,
        }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    return response.json();
  }, []);

  return { sendMessage };
}