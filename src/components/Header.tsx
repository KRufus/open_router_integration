import React from 'react';
import { MessageSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Multi-LLM Chat</h1>
            <p className="text-sm text-gray-500">Powered by OpenRouter</p>
          </div>
        </div>
        <a
          href="https://openrouter.ai/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          API Documentation →
        </a>
      </div>
    </header>
  );
}