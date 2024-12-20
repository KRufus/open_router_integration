import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ModelUsage } from '../../types/models';

export function UsageStats() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
        <div className="flex space-x-2">
          <select className="form-select text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Token Usage by Model</h3>
          <div className="h-64">
            <BarChart width={800} height={250} data={[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tokens" fill="#4F46E5" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}