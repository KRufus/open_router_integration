import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import type { LLMModel, ModelCategory } from '../../types/models';

export function ModelManager() {
  const [models, setModels] = useState<LLMModel[]>([]);
  const [categories, setCategories] = useState<ModelCategory[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Model Management</h2>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Categories
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <div key={model.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{model.icon}</span>
                <h3 className="font-medium text-gray-900">{model.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <switch-component checked={model.isEnabled} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{model.description}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Context: {model.contextLength.toLocaleString()} tokens</span>
              <span>Cost: ${model.costPer1kTokens}/1k tokens</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}