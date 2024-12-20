import { useState } from 'react';
import type { Message } from '../types/chat';

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedModel(null);
  };

  return {
    messages,
    selectedModel,
    isLoading,
    setIsLoading,
    setSelectedModel,
    addMessage,
    clearChat
  };
}