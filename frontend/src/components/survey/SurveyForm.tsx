// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
// import { surveyAPI } from '@/lib/api';
// import { Question, Institution, Project } from '@/types';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import Select from '@/components/ui/Select';
// import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// // Dimensions for different survey types
// const RAFSIA_DIMENSIONS = [
//   { key: 'technical', label: 'Technical Readiness' },
//   { key: 'economic', label: 'Economic Readiness' },
//   { key: 'socio_cultural', label: 'Socio-Cultural Readiness' },
//   { key: 'environmental', label: 'Environmental Readiness' },
//   { key: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
// ];

// const ISP_DIMENSIONS = [
//   { key: 'technical', label: 'Technical Readiness' },
//   { key: 'economic', label: 'Economic and Financial Readiness' },
//   { key: 'policy_regulatory', label: 'Policy and Regulatory Readiness' },
//   { key: 'socio_cultural', label: 'Socio-Cultural Readiness' },
//   { key: 'environmental', label: 'Environmental Readiness' },
//   { key: 'strategic', label: 'Strategic and Future Outlook' },
// ];

// const ROLE_OPTIONS = [
//   { value: '', label: 'Select your role...' },
//   { value: 'lecturer', label: 'Lecturer' },
//   { value: 'it_support', label: 'IT Support' },
//   { value: 'admin', label: 'Administrator' },
//   { value: 'principal', label: 'Principal' },
//   { value: 'student', label: 'Student' },
//   { value: 'service_provider', label: 'Service Provider' },
// ];

// const GENDER_OPTIONS = [
//   { value: '', label: 'Select gender...' },
//   { value: 'male', label: 'Male' },
//   { value: 'female', label: 'Female' },
//   { value: 'other', label: 'Other' },
//   { value: 'prefer_not_to_say', label: 'Prefer not to say' },
// ];

// const SurveyForm: React.FC = () => {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [institutions, setInstitutions] = useState<Institution[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
//   // Form data
//   const [formData, setFormData] = useState({
//     // Respondent info
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//     gender: '',
//     institution: '',
//     institution_name: '',
//     county: '',
//     project: '',
//     consent_given: false,
//     is_anonymous: false,
    
//     // Answers - grouped by dimension
//     answers: {} as Record<number, number>,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     if (formData.role && selectedProject) {
//       loadQuestions();
//     }
//   }, [formData.role, selectedProject]);

//   useEffect(() => {
//     // Update selected project when project field changes
//     if (formData.project) {
//       const project = projects.find(p => p.id.toString() === formData.project);
//       setSelectedProject(project || null);
//     } else {
//       setSelectedProject(null);
//     }
//   }, [formData.project, projects]);

//   const loadInitialData = async () => {
//     try {
//       const [institutionsRes, projectsRes] = await Promise.all([
//         surveyAPI.getInstitutions(),
//         surveyAPI.getProjects(),
//       ]);
//       setInstitutions(institutionsRes.data);
//       setProjects(projectsRes.data);
//     } catch (error) {
//       console.error('Error loading initial data:', error);
//     }
//   };

//   const loadQuestions = async () => {
//     if (!selectedProject) return;
    
//     try {
//       setLoading(true);
      
//       // Determine survey type and role mapping
//       let surveyRole = '';
//       const surveyType = selectedProject.survey_type || 'rafsia';
      
//       if (surveyType === 'rafsia') {
//         surveyRole = ['lecturer', 'it_support', 'admin', 'principal', 'student'].includes(formData.role) ? 'ihl' : 'isp';
//       } else if (surveyType === 'isp') {
//         surveyRole = 'isp'; // ISP survey is primarily for ISP role
//       }
      
//       // Fetch questions based on survey type and role
//       const response = await surveyAPI.getQuestions(surveyRole, surveyType);
//       setQuestions(response.data);
      
//       // Initialize answers with neutral value (3)
//       const initialAnswers: Record<number, number> = {};
//       response.data.forEach((q: Question) => {
//         initialAnswers[q.id] = 3;
//       });
//       setFormData(prev => ({ ...prev, answers: initialAnswers }));
      
//       console.log(`Loaded ${response.data.length} questions for survey: ${surveyType}, role: ${surveyRole}`);
//     } catch (error) {
//       console.error('Error loading questions:', error);
//       alert('Error loading questions. Please refresh the page and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleAnswerChange = (questionId: number, value: number) => {
//     setFormData(prev => ({
//       ...prev,
//       answers: { ...prev.answers, [questionId]: value }
//     }));
//   };

//   const validateStep = (step: number): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (step === 0) {
//       if (!formData.project) newErrors.project = 'Project/Study selection is required';
//       if (!formData.role) newErrors.role = 'Role is required';
//       if (!formData.county) newErrors.county = 'County is required';
//       if (!formData.consent_given) newErrors.consent_given = 'Consent is required to proceed';
      
//       // For ISP survey, gender is required
//       if (selectedProject?.survey_type === 'isp' && !formData.gender) {
//         newErrors.gender = 'Gender is required';
//       }
      
//       if (formData.role !== 'service_provider' && !formData.is_anonymous) {
//         if (!formData.name) newErrors.name = 'Name is required';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, getMaxStep()));
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 0));
//   };

//   const getMaxStep = () => {
//     const dimensions = getCurrentDimensions();
//     return dimensions.length; // 0: info, 1-N: dimensions
//   };

//   const getCurrentDimensions = () => {
//     if (!selectedProject) return RAFSIA_DIMENSIONS;
//     return selectedProject.survey_type === 'isp' ? ISP_DIMENSIONS : RAFSIA_DIMENSIONS;
//   };

//   const getCurrentDimensionQuestions = () => {
//     if (currentStep === 0) return [];
//     const dimensions = getCurrentDimensions();
//     const dimension = dimensions[currentStep - 1];
//     return questions.filter(q => q.dimension === dimension.key);
//   };

//   const getSurveyTitle = () => {
//     if (!selectedProject) return 'Assessment Survey';
//     return selectedProject.survey_type === 'isp' 
//       ? 'ISP Service Provider Assessment' 
//       : 'RAFSIA Readiness Assessment';
//   };

//   const getSurveyDescription = () => {
//     if (!selectedProject) return 'Please select a project to begin';
//     return selectedProject.survey_type === 'isp'
//       ? 'Assessment for Internet Service Providers on satellite internet readiness'
//       : 'Satellite Internet Adoption Readiness Survey';
//   };

//   const submitSurvey = async () => {
//     if (!validateStep(currentStep)) return;

//     setLoading(true);
//     try {
//       const submissionData = {
//         ...formData,
//         institution: formData.institution ? Number(formData.institution) : null,
//         project: formData.project ? Number(formData.project) : null,
//         survey_type: selectedProject?.survey_type || 'rafsia',
//         answers: Object.entries(formData.answers).map(([questionId, value]) => ({
//           question: Number(questionId),
//           value: Number(value)
//         }))
//       };

//       const response = await surveyAPI.submitSurvey(submissionData);
//       router.push(`/results/${response.data.id}`);
//     } catch (error: any) {
//       console.error('Error submitting survey:', error);
//       alert('Error submitting survey. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRespondentInfo = () => (
//     <Card>
//       <CardHeader>
//         <h2 className="text-xl font-semibold text-gray-900">Respondent Information</h2>
//         <p className="text-sm text-gray-600">Please provide your basic information to begin the assessment.</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {/* Project Selection - First field */}
//         {projects.length > 0 && (
//           <Select
//             label="Project/Study *"
//             value={formData.project}
//             onChange={(e) => handleInputChange('project', e.target.value)}
//             options={[
//               { value: '', label: 'Select project/study...' },
//               ...projects.map(proj => ({ value: proj.id.toString(), label: proj.name }))
//             ]}
//             error={errors.project}
//           />
//         )}

//         {selectedProject && (
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="font-medium text-blue-900">{selectedProject.name}</h3>
//             <p className="text-sm text-blue-700 mt-1">{selectedProject.description}</p>
//           </div>
//         )}

//         <Select
//           label="Role *"
//           value={formData.role}
//           onChange={(e) => handleInputChange('role', e.target.value)}
//           options={ROLE_OPTIONS}
//           error={errors.role}
//         />

//         {/* Show gender field for ISP survey */}
//         {selectedProject?.survey_type === 'isp' && (
//           <Select
//             label="Gender *"
//             value={formData.gender}
//             onChange={(e) => handleInputChange('gender', e.target.value)}
//             options={GENDER_OPTIONS}
//             error={errors.gender}
//           />
//         )}

//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="anonymous"
//             checked={formData.is_anonymous}
//             onChange={(e) => handleInputChange('is_anonymous', e.target.checked)}
//             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//           />
//           <label htmlFor="anonymous" className="text-sm text-gray-700">
//             Submit anonymously (hide personal information)
//           </label>
//         </div>

//         {!formData.is_anonymous && (
//           <>
//             <Input
//               label="Full Name *"
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleInputChange('name', e.target.value)}
//               error={errors.name}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 label="Email Address"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//               />
//               <Input
//                 label="Phone Number"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => handleInputChange('phone', e.target.value)}
//               />
//             </div>
//           </>
//         )}

//         {formData.role !== 'service_provider' && (
//           <>
//             {institutions.length > 0 && (
//               <Select
//                 label="Institution (if listed)"
//                 value={formData.institution}
//                 onChange={(e) => handleInputChange('institution', e.target.value)}
//                 options={[
//                   { value: '', label: 'Select institution...' },
//                   ...institutions.map(inst => ({ value: inst.id.toString(), label: inst.name }))
//                 ]}
//               />
//             )}

//             <Input
//               label="Institution Name (if not listed above)"
//               type="text"
//               value={formData.institution_name}
//               onChange={(e) => handleInputChange('institution_name', e.target.value)}
//             />
//           </>
//         )}

//         <Input
//           label="County *"
//           type="text"
//           value={formData.county}
//           onChange={(e) => handleInputChange('county', e.target.value)}
//           error={errors.county}
//         />

//         <div className="bg-blue-50 p-4 rounded-lg">
//           <div className="flex items-start space-x-2">
//             <input
//               type="checkbox"
//               id="consent"
//               checked={formData.consent_given}
//               onChange={(e) => handleInputChange('consent_given', e.target.checked)}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
//             />
//             <div>
//               <label htmlFor="consent" className="text-sm text-gray-700">
//                 <strong>Informed Consent *</strong>
//               </label>
//               <p className="text-xs text-gray-600 mt-1">
//                 I understand that my responses will be used for research purposes to assess readiness for satellite internet adoption. 
//                 My data will be handled securely and in compliance with applicable data protection regulations. 
//                 I can withdraw my consent at any time by contacting the research team.
//               </p>
//             </div>
//           </div>
//           {errors.consent_given && (
//             <p className="text-sm text-red-600 mt-2">{errors.consent_given}</p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderLikertScale = (questionId: number, currentValue: number) => {
//     const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
//     return (
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           {labels.map((label, index) => (
//             <span key={index} className="text-xs text-gray-500 text-center flex-1">
//               {label}
//             </span>
//           ))}
//         </div>
//         <div className="flex justify-between items-center">
//           {[1, 2, 3, 4, 5].map((value) => (
//             <label key={value} className="flex flex-col items-center space-y-1 cursor-pointer flex-1">
//               <input
//                 type="radio"
//                 name={`question-${questionId}`}
//                 value={value}
//                 checked={currentValue === value}
//                 onChange={() => handleAnswerChange(questionId, value)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-sm font-medium">{value}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderDimension = () => {
//     if (currentStep === 0) return renderRespondentInfo();
    
//     const dimensions = getCurrentDimensions();
//     const dimension = dimensions[currentStep - 1];
//     const dimensionQuestions = getCurrentDimensionQuestions();

//     if (loading) {
//       return (
//         <Card>
//           <CardContent className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-2 text-gray-600">Loading questions...</p>
//             </div>
//           </CardContent>
//         </Card>
//       );
//     }

//     if (dimensionQuestions.length === 0) {
//       return (
//         <Card>
//           <CardHeader>
//             <h2 className="text-xl font-semibold text-gray-900">{dimension.label}</h2>
//           </CardHeader>
//           <CardContent className="text-center py-8">
//             <p className="text-gray-600 mb-4">No questions available for this dimension.</p>
//             <p className="text-sm text-gray-500">
//               Please ensure you have selected a project and that questions are loaded in the database.
//             </p>
//           </CardContent>
//         </Card>
//       );
//     }

//     return (
//       <Card>
//         <CardHeader>
//           <h2 className="text-xl font-semibold text-gray-900">{dimension.label}</h2>
//           <p className="text-sm text-gray-600">
//             Please rate your agreement with the following statements on a scale of 1 to 5. 
//             ({dimensionQuestions.length} questions)
//           </p>
//         </CardHeader>
//         <CardContent className="space-y-8">
//           {dimensionQuestions.map((question) => (
//             <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">
//                 {question.text}
//               </h3>
//               {renderLikertScale(question.id, formData.answers[question.id] || 3)}
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     );
//   };

//   const getProgressPercentage = () => {
//     return (currentStep / getMaxStep()) * 100;
//   };

//   // Don't show survey content until project is selected
//   if (!selectedProject && currentStep > 0) {
//     setCurrentStep(0);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">{getSurveyTitle()}</h1>
//           <p className="text-gray-600 mt-2">{getSurveyDescription()}</p>
//         </div>

//         {/* Progress bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">
//               Step {currentStep + 1} of {getMaxStep() + 1}
//             </span>
//             <span className="text-sm text-gray-600">
//               {Math.round(getProgressPercentage())}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${getProgressPercentage()}%` }}
//             />
//           </div>
//         </div>

//         {/* Survey content */}
//         {renderDimension()}

//         {/* Navigation */}
//         <div className="flex justify-between mt-8">
//           <Button
//             variant="outline"
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className="flex items-center space-x-2"
//           >
//             <ChevronLeft size={16} />
//             <span>Previous</span>
//           </Button>

//           {currentStep === getMaxStep() ? (
//             <Button
//               onClick={submitSurvey}
//               disabled={loading || !selectedProject}
//               className="flex items-center space-x-2"
//             >
//               {loading ? (
//                 <span>Submitting...</span>
//               ) : (
//                 <>
//                   <Check size={16} />
//                   <span>Submit Survey</span>
//                 </>
//               )}
//             </Button>
//           ) : (
//             <Button
//               onClick={nextStep}
//               disabled={!selectedProject && currentStep === 0}
//               className="flex items-center space-x-2"
//             >
//               <span>Next</span>
//               <ChevronRight size={16} />
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SurveyForm;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { Question, Institution, Project } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// Dimensions for different survey types
const RAFSIA_DIMENSIONS = [
  { key: 'technical', label: 'Technical Readiness' },
  { key: 'economic', label: 'Economic Readiness' },
  { key: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { key: 'environmental', label: 'Environmental Readiness' },
  { key: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
];

const ISP_DIMENSIONS = [
  { key: 'technical', label: 'Technical Readiness' },
  { key: 'economic', label: 'Economic and Financial Readiness' },
  { key: 'policy_regulatory', label: 'Policy and Regulatory Readiness' },
  { key: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { key: 'environmental', label: 'Environmental Readiness' },
  { key: 'strategic', label: 'Strategic and Future Outlook' },
];

const ROLE_OPTIONS = [
  { value: '', label: 'Select your role...' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'it_support', label: 'IT Support' },
  { value: 'admin', label: 'Administrator' },
  { value: 'principal', label: 'Principal' },
  { value: 'student', label: 'Student' },
  { value: 'service_provider', label: 'Service Provider' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'Select gender...' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const SurveyForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    gender: '',
    institution: '',
    institution_name: '',
    county: '',
    project: '',
    consent_given: false,
    is_anonymous: false,
    answers: {} as Record<number, number>,
    dimension_comments: {} as Record<string, string>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.role && selectedProject) {
      loadQuestions();
    }
  }, [formData.role, selectedProject]);

  useEffect(() => {
    if (formData.project) {
      const project = projects.find(p => p.id.toString() === formData.project);
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  }, [formData.project, projects]);

  const loadInitialData = async () => {
    try {
      const [institutionsRes, projectsRes] = await Promise.all([
        surveyAPI.getInstitutions(),
        surveyAPI.getProjects(),
      ]);
      setInstitutions(institutionsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadQuestions = async () => {
    if (!selectedProject) return;
    
    try {
      setLoading(true);
      let surveyRole = '';
      const surveyType = selectedProject.survey_type || 'rafsia';
      
      if (surveyType === 'rafsia') {
        surveyRole = ['lecturer', 'it_support', 'admin', 'principal', 'student'].includes(formData.role) ? 'ihl' : 'isp';
      } else if (surveyType === 'isp') {
        surveyRole = 'isp';
      }
      
      const response = await surveyAPI.getQuestions(surveyRole, surveyType);
      setQuestions(response.data);
      
      const initialAnswers: Record<number, number> = {};
      response.data.forEach((q: Question) => {
        initialAnswers[q.id] = 3;
      });
      setFormData(prev => ({ ...prev, answers: initialAnswers }));
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Error loading questions. Please refresh the page and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAnswerChange = (questionId: number, value: number) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }));
  };

  const handleDimensionCommentChange = (dimension: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dimension_comments: { ...prev.dimension_comments, [dimension]: value }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.project) newErrors.project = 'Project/Study selection is required';
      if (!formData.role) newErrors.role = 'Role is required';
      if (!formData.county) newErrors.county = 'County is required';
      if (!formData.consent_given) newErrors.consent_given = 'Consent is required to proceed';
      if (selectedProject?.survey_type === 'isp' && !formData.gender) {
        newErrors.gender = 'Gender is required';
      }
      if (formData.role !== 'service_provider' && !formData.is_anonymous) {
        if (!formData.name) newErrors.name = 'Name is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, getMaxStep()));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const getMaxStep = () => getCurrentDimensions().length;

  const getCurrentDimensions = () =>
    selectedProject?.survey_type === 'isp' ? ISP_DIMENSIONS : RAFSIA_DIMENSIONS;

  const getCurrentDimensionQuestions = () => {
    if (currentStep === 0) return [];
    const dimensions = getCurrentDimensions();
    const dimension = dimensions[currentStep - 1];
    return questions.filter(q => q.dimension === dimension.key);
  };

  const getSurveyTitle = () =>
    !selectedProject
      ? 'Assessment Survey'
      : selectedProject.survey_type === 'isp'
      ? 'ISP Service Provider Assessment'
      : 'RAFSIA Readiness Assessment';

  const getSurveyDescription = () =>
    !selectedProject
      ? 'Please select a project to begin'
      : selectedProject.survey_type === 'isp'
      ? 'Assessment for Internet Service Providers on satellite internet readiness'
      : 'Satellite Internet Adoption Readiness Survey';

  const submitSurvey = async () => {
    if (!validateStep(currentStep)) return;
    setLoading(true);
    try {
      const dimensionComments = Object.fromEntries(
        Object.entries(formData.dimension_comments ?? {}).filter(
          ([, value]) => typeof value === 'string' && value.trim().length > 0
        )
      );

      const submissionData = {
        ...formData,
        institution: formData.institution ? Number(formData.institution) : null,
        project: formData.project ? Number(formData.project) : null,
        survey_type: selectedProject?.survey_type || 'rafsia',
        dimension_comments: dimensionComments,
        answers: Object.entries(formData.answers).map(([questionId, value]) => ({
          question: Number(questionId),
          value: Number(value)
        })),
      };
      const response = await surveyAPI.submitSurvey(submissionData);
      const submissionId = response?.data?.id;

      if (!submissionId) {
        throw new Error('Submission completed but no identifier was returned.');
      }

      router.push(`/results/${submissionId}?public=true`);
    } catch (error: any) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderRespondentInfo = () => (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">Respondent Information</h2>
        <p className="text-sm text-gray-600">Please provide your basic information to begin the assessment.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length > 0 && (
          <Select
            label="Project/Study *"
            value={formData.project}
            onChange={(e) => handleInputChange('project', e.target.value)}
            options={[
              { value: '', label: 'Select project/study...' },
              ...projects.map(proj => ({ value: proj.id.toString(), label: proj.name }))
            ]}
            error={errors.project}
          />
        )}

        {selectedProject && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">{selectedProject.name}</h3>
            <p className="text-sm text-blue-700 mt-1">{selectedProject.description}</p>
          </div>
        )}

        <Select
          label="Role *"
          value={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          options={ROLE_OPTIONS}
          error={errors.role}
        />

        {selectedProject?.survey_type === 'isp' && (
          <Select
            label="Gender *"
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            options={GENDER_OPTIONS}
            error={errors.gender}
          />
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData.is_anonymous}
            onChange={(e) => handleInputChange('is_anonymous', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Submit anonymously (hide personal information)
          </label>
        </div>

        {!formData.is_anonymous && (
          <>
            <Input
              label="Full Name *"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </>
        )}

        {formData.role !== 'service_provider' && (
          <>
            {institutions.length > 0 && (
              <Select
                label="Institution (if listed)"
                value={formData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                options={[
                  { value: '', label: 'Select institution...' },
                  ...institutions.map(inst => ({ value: inst.id.toString(), label: inst.name }))
                ]}
              />
            )}

            <Input
              label="Institution Name (if not listed above)"
              type="text"
              value={formData.institution_name}
              onChange={(e) => handleInputChange('institution_name', e.target.value)}
            />
          </>
        )}

        <Input
          label="County *"
          type="text"
          value={formData.county}
          onChange={(e) => handleInputChange('county', e.target.value)}
          error={errors.county}
        />

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent_given}
              onChange={(e) => handleInputChange('consent_given', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <div>
              <label htmlFor="consent" className="text-sm text-gray-700">
                <strong>Informed Consent *</strong>
              </label>
              <p className="text-xs text-gray-600 mt-1">
                I understand that my responses will be used for research purposes to assess readiness for satellite internet adoption. 
                My data will be handled securely and in compliance with applicable data protection regulations. 
                I can withdraw my consent at any time by contacting the research team.
              </p>
            </div>
          </div>
          {errors.consent_given && (
            <p className="text-sm text-red-600 mt-2">{errors.consent_given}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderLikertScale = (questionId: number, currentValue: number) => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          {labels.map((label, index) => (
            <span key={index} className="text-xs text-gray-500 text-center flex-1">{label}</span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map(value => (
            <label key={value} className="flex flex-col items-center space-y-1 cursor-pointer flex-1">
              <input
                type="radio"
                name={`question-${questionId}`}
                value={value}
                checked={currentValue === value}
                onChange={() => handleAnswerChange(questionId, value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">{value}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderDimension = () => {
    if (currentStep === 0) return renderRespondentInfo();

    const dimensions = getCurrentDimensions();
    const dimension = dimensions[currentStep - 1];
    const dimensionQuestions = getCurrentDimensionQuestions();

    if (loading) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading questions...</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (dimensionQuestions.length === 0) {
      return (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">{dimension.label}</h2>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">No questions available for this dimension.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">{dimension.label}</h2>
          <p className="text-sm text-gray-600">
            Please rate your agreement with the following statements on a scale of 1 to 5. 
            ({dimensionQuestions.length} questions)
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {dimensionQuestions.map(question => (
            <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{question.text}</h3>
              {renderLikertScale(question.id, formData.answers[question.id] || 3)}
            </div>
          ))}

          {/* Comment section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Please share any additional thoughts, concerns, or context about {dimension.label.toLowerCase()} in your organization.
            </p>
            <textarea
              value={formData.dimension_comments[dimension.key] || ''}
              onChange={(e) => handleDimensionCommentChange(dimension.key, e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Share your thoughts on ${dimension.label.toLowerCase()}...`}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(formData.dimension_comments[dimension.key] || '').length}/1000 characters
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getProgressPercentage = () => (currentStep / getMaxStep()) * 100;

  if (!selectedProject && currentStep > 0) setCurrentStep(0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getSurveyTitle()}</h1>
          <p className="text-gray-600 mt-2">{getSurveyDescription()}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {getMaxStep() + 1}</span>
            <span className="text-sm text-gray-600">{Math.round(getProgressPercentage())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${getProgressPercentage()}%` }} />
          </div>
        </div>

        {renderDimension()}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="flex items-center space-x-2">
            <ChevronLeft size={16} /><span>Previous</span>
          </Button>

          {currentStep === getMaxStep() ? (
            <Button onClick={submitSurvey} disabled={loading || !selectedProject} className="flex items-center space-x-2">
              {loading ? <span>Submitting...</span> : (<><Check size={16} /><span>Submit Survey</span></>)}
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!selectedProject && currentStep === 0} className="flex items-center space-x-2">
              <span>Next</span><ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;