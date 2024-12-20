import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { ApiKeyManager } from './ApiKeyManager';
import { ModelManager } from './ModelManager';
import { UsageStats } from './UsageStats';

export function AdminPanel() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="api-keys">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <ApiKeyManager />
        </TabsContent>

        <TabsContent value="models">
          <ModelManager />
        </TabsContent>

        <TabsContent value="usage">
          <UsageStats />
        </TabsContent>
      </Tabs>
    </div>
  );
}