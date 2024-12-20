import React, { useCallback } from 'react';
import { Plus, Settings } from 'lucide-react';
import { ChatMessage } from '../ChatMessage';
import { ModelSelector } from '../ModelSelector';
import { ChatInput } from '../ChatInput';
import { TypingIndicator } from '../TypingIndicator';
import { useChatState } from '../../hooks/useChatState';
import { sendChatMessage } from '../../services/openrouter';

export function UserChat() {
  const {
    messages,
    selectedModel,
    isLoading,
    setIsLoading,
    setSelectedModel,
    addMessage,
    clearChat
  } = useChatState();

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedModel) return;

    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      model: selectedModel,
      timestamp: Date.now()
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      // In production, get API key from your backend
      const apiKey = 'YOUR_OPENROUTER_API_KEY';
      const response = await sendChatMessage(selectedModel, [...messages, userMessage], apiKey);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant' as const,
        model: selectedModel,
        timestamp: Date.now()
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, messages, addMessage, setIsLoading]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={clearChat}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          New Chat
        </button>
        {selectedModel && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Using: {selectedModel.split('/')[1]}</span>
            <button
              onClick={() => setSelectedModel(null)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Change Model
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {selectedModel ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        ) : (
          <ModelSelector
            selectedModel={selectedModel || ''}
            onModelSelect={setSelectedModel}
          />
        )}
      </div>

      {selectedModel && (
        <div className="p-4 border-t">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}