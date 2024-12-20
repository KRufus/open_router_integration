import React from 'react';
import { Search } from 'lucide-react';

const MODEL_CATEGORIES = {
  flagship: {
    title: 'Flagship models',
    models: [
      {
        id: 'anthropic/claude-3-sonnet',
        name: 'Claude 3',
        icon: '🧠',
      },
      {
        id: 'openai/gpt-4-turbo',
        name: 'GPT-4',
        icon: '🤖',
      },
      {
        id: 'google/gemini-pro',
        name: 'Gemini',
        icon: '💫',
      },
    ]
  },
  roleplay: {
    title: 'Best roleplay models',
    models: [
      {
        id: 'meta-llama/llama-2-70b',
        name: 'Llama 2',
        icon: '🦙',
      },
      {
        id: 'anthropic/claude-2',
        name: 'Claude 2',
        icon: '🎭',
      }
    ]
  },
  coding: {
    title: 'Best coding models',
    models: [
      {
        id: 'openai/gpt-4-turbo',
        name: 'GPT-4',
        icon: '🤖',
      },
      {
        id: 'anthropic/claude-3-sonnet',
        name: 'Claude 3',
        icon: '🧠',
      }
    ]
  },
  affordable: {
    title: 'Long context, low price',
    models: [
      {
        id: 'mistralai/mistral-7b',
        name: 'Mistral',
        icon: '🌪️',
      },
      {
        id: 'meta-llama/llama-2-13b',
        name: 'Llama 2',
        icon: '🦙',
      }
    ]
  }
};

type ModelSelectorProps = {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
};

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search models..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(MODEL_CATEGORIES).map(([key, category]) => (
          <div key={key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium mb-3">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => onModelSelect(model.id)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                    selectedModel === model.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1.5">{model.icon}</span>
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}