@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { BarChart3, Users, FileText, TrendingUp, Download, Filter } from 'lucide-react';
+import { BarChart3, Users, FileText, TrendingUp, Download, Filter, MapPin } from 'lucide-react';
 import { surveyAPI, interviewAPI } from '@/lib/api';
 import { Statistics, Submission } from '@/types';
 import Button from '@/components/ui/Button';
@@ .. @@
         {/* Statistics Cards */}
         {statistics && (
         )
         }
-          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
+          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <Card>
               <CardContent className="flex items-center p-6">
                 <div className="flex-shrink-0">
                   <Users className="h-8 w-8 text-blue-600" />
                 </div>
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                   <p className="text-2xl font-semibold text-gray-900">{statistics.total_submissions}</p>
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardContent className="flex items-center p-6">
                 <div className="flex-shrink-0">
                   <TrendingUp className="h-8 w-8 text-green-600" />
                 </div>
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Average Readiness</p>
                   <p className="text-2xl font-semibold text-gray-900">
                     {Math.round(statistics.average_scores.overall)}%
                   </p>
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardContent className="flex items-center p-6">
                 <div className="flex-shrink-0">
                   <BarChart3 className="h-8 w-8 text-purple-600" />
                 </div>
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Very Ready</p>
                   <p className="text-2xl font-semibold text-gray-900">
                     {statistics.by_readiness_level.very_ready || 0}
                   </p>
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardContent className="flex items-center p-6">
                 <div className="flex-shrink-0">
-                  <FileText className="h-8 w-8 text-amber-600" />
+                  <MapPin className="h-8 w-8 text-orange-600" />
                 </div>
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Counties</p>
                   <p className="text-2xl font-semibold text-gray-900">
                     {Object.keys(statistics.by_county).length}
                   </p>
                 </div>
               </CardContent>
             </Card>
           </div>
         )}