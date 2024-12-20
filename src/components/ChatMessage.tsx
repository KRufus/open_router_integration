import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}>
      <div
        className={`flex-1 max-w-3xl ${
          isUser ? 'ml-auto' : 'mr-auto'
        } rounded-xl p-4 ${
          isUser ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-50 border border-gray-100'
        } transform transition-all duration-200 hover:shadow-lg`}
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${isUser ? 'order-2 ml-3' : 'mr-3'}`}>
            {isUser ? (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="h-5 w-5 text-indigo-600" />
              </div>
            )}
          </div>
          <div className={`flex-1 ${isUser ? 'order-1' : ''}`}>
            <p className={`${isUser ? 'text-white' : 'text-gray-900'} whitespace-pre-wrap`}>
              {message.content}
            </p>
            <p
              className={`text-xs mt-2 ${
                isUser ? 'text-indigo-200' : 'text-gray-500'
              }`}
            >
              {message.model.split('/')[1]} · {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}