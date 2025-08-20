@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
-import { interviewAPI } from '@/lib/api';
-import { InterviewNote } from '@/types';
-import Button from '@/components/ui/Button';
-import Input from '@/components/ui/Input';
-import Select from '@/components/ui/Select';
-import Modal from '@/components/ui/Modal';
-import { Card, CardContent, CardHeader } from '@/components/ui/Card';
+import { interviewAPI } from '../../lib/api';
+import { InterviewNote } from '../../types';
+import Button from '../ui/Button';
+import Input from '../ui/Input';
+import Select from '../ui/Select';
+import Modal from '../ui/Modal';
+import { Card, CardContent, CardHeader } from '../ui/Card';