'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function UsersTab() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Users</h3>
        <p className="text-sm text-gray-600">Admin users and permissions (coming soon)</p>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Users/roles UI goes here.</div>
      </CardContent>
    </Card>
  );
}
