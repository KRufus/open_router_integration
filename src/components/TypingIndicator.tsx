import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex space-x-2 p-4 bg-white rounded-lg border border-gray-200 max-w-[200px]">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
      <span className="text-sm text-gray-500">AI is typing...</span>
    </div>
  );
}