'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { surveyAPI } from '@/lib/api';
import { Institution, Submission } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface ReadinessMapProps {
  className?: string;
}

const ReadinessMap: React.FC<ReadinessMapProps> = ({ className = '' }) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = async () => {
    try {
      const [institutionsRes, submissionsRes] = await Promise.all([
        surveyAPI.getInstitutions(),
        surveyAPI.getSubmissions(),
      ]);
      
      setInstitutions(institutionsRes.data.filter((inst: Institution) => 
        inst.latitude && inst.longitude
      ));
      setSubmissions(submissionsRes.data);
    } catch (error) {
      console.error('Error loading map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInstitutionReadiness = (institutionId: number) => {
    const institutionSubmissions = submissions.filter(
      sub => sub.institution === institutionId
    );
    
    if (institutionSubmissions.length === 0) return null;
    
    const avgScore = institutionSubmissions.reduce(
      (sum, sub) => sum + sub.overall_score, 0
    ) / institutionSubmissions.length;
    
    return {
      score: avgScore,
      count: institutionSubmissions.length,
      level: avgScore >= 80 ? 'very_ready' : avgScore >= 60 ? 'not_sure' : 'not_ready'
    };
  };

  const getMarkerColor = (readiness: any) => {
    if (!readiness) return '#6B7280'; // Gray for no data
    
    switch (readiness.level) {
      case 'very_ready': return '#10B981'; // Green
      case 'not_sure': return '#F59E0B'; // Amber
      case 'not_ready': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Readiness by Location</h3>
        <p className="text-sm text-gray-600">
          Geographic distribution of readiness scores across institutions
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-lg overflow-hidden">
          {typeof window !== 'undefined' && (
            <MapContainer
              center={[0.5, 34.5]} // Kenya center
              zoom={7}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {institutions.map((institution) => {
                const readiness = getInstitutionReadiness(institution.id);
                
                return (
                  <Marker
                    key={institution.id}
                    position={[institution.latitude!, institution.longitude!]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900">
                          {institution.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {institution.county} County
                        </p>
                        
                        {readiness ? (
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Readiness Score:</span>{' '}
                              <span 
                                className="font-semibold"
                                style={{ color: getMarkerColor(readiness) }}
                              >
                                {Math.round(readiness.score)}%
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              Based on {readiness.count} submission{readiness.count !== 1 ? 's' : ''}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No data available</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Very Ready (80-100)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Not Sure (60-79)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Not Ready (&lt;60)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>No Data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadinessMap;