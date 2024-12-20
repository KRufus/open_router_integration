import React, { useState, KeyboardEvent } from 'react';
import { Send, Settings } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-center">
      <button className="absolute left-4 text-gray-400 hover:text-gray-600">
        <Settings className="w-5 h-5" />
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Start a message..."
        className="w-full pl-12 pr-12 py-3 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-gray-50"
        rows={1}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
        className={`absolute right-4 ${
          message.trim() && !disabled
            ? 'text-indigo-600 hover:text-indigo-700'
            : 'text-gray-400'
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}