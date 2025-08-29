'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function SurveysTab() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Surveys</h3>
        <p className="text-sm text-gray-600">Manage survey definitions (coming soon)</p>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">Build your surveys here.</div>
      </CardContent>
    </Card>
  );
}
