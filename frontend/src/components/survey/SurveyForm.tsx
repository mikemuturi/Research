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

const DIMENSIONS = [
  { key: 'technical', label: 'Technical Readiness' },
  { key: 'economic', label: 'Economic Readiness' },
  { key: 'socio_cultural', label: 'Socio-Cultural Readiness' },
  { key: 'environmental', label: 'Environmental Readiness' },
  { key: 'policy_regulatory', label: 'Policy & Regulatory Readiness' },
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

const SurveyForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Respondent info
    name: '',
    email: '',
    phone: '',
    role: '',
    institution: '',
    institution_name: '',
    county: '',
    project: '',
    consent_given: false,
    is_anonymous: false,
    
    // Answers - grouped by dimension
    answers: {} as Record<number, number>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.role) {
      loadQuestions();
    }
  }, [formData.role]);

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
    try {
      setLoading(true);
      const surveyRole = ['lecturer', 'it_support', 'admin', 'principal', 'student'].includes(formData.role) ? 'ihl' : 'isp';
      const response = await surveyAPI.getQuestions(surveyRole);
      setQuestions(response.data);
      
      // Initialize answers with neutral value (3)
      const initialAnswers: Record<number, number> = {};
      response.data.forEach((q: Question) => {
        initialAnswers[q.id] = 3;
      });
      setFormData(prev => ({ ...prev, answers: initialAnswers }));
      
      console.log(`Loaded ${response.data.length} questions for role: ${surveyRole}`);
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.role) newErrors.role = 'Role is required';
      if (!formData.county) newErrors.county = 'County is required';
      if (!formData.consent_given) newErrors.consent_given = 'Consent is required to proceed';
      
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

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const getMaxStep = () => {
    return DIMENSIONS.length; // 0: info, 1-5: dimensions
  };

  const getCurrentDimensionQuestions = () => {
    if (currentStep === 0) return [];
    const dimension = DIMENSIONS[currentStep - 1];
    return questions.filter(q => q.dimension === dimension.key);
  };

  const submitSurvey = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        institution: formData.institution ? Number(formData.institution) : null,
        project: formData.project ? Number(formData.project) : null,
        answers: Object.entries(formData.answers).map(([questionId, value]) => ({
          question: Number(questionId),
          value: Number(value)
        }))
      };

      const response = await surveyAPI.submitSurvey(submissionData);
      router.push(`/results/${response.data.id}`);
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
        <Select
          label="Role *"
          value={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          options={ROLE_OPTIONS}
          error={errors.role}
        />

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

        {projects.length > 0 && (
          <Select
            label="Project/Study"
            value={formData.project}
            onChange={(e) => handleInputChange('project', e.target.value)}
            options={[
              { value: '', label: 'Select project...' },
              ...projects.map(proj => ({ value: proj.id.toString(), label: proj.name }))
            ]}
          />
        )}

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
            <span key={index} className="text-xs text-gray-500 text-center flex-1">
              {label}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((value) => (
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
    
    const dimension = DIMENSIONS[currentStep - 1];
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
            <p className="text-sm text-gray-500">
              Please ensure you have selected a role and that questions are loaded in the database.
            </p>
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
          {dimensionQuestions.map((question) => (
            <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                {question.text}
              </h3>
              {renderLikertScale(question.id, formData.answers[question.id] || 3)}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const getProgressPercentage = () => {
    return (currentStep / getMaxStep()) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">RAFSIA Readiness Assessment</h1>
          <p className="text-gray-600 mt-2">Satellite Internet Adoption Readiness Survey</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {getMaxStep() + 1}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Survey content */}
        {renderDimension()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          {currentStep === getMaxStep() ? (
            <Button
              onClick={submitSurvey}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Check size={16} />
                  <span>Submit Survey</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;