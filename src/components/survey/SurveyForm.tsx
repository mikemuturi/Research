'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, User, Building, MapPin, Mail, Phone } from 'lucide-react';
import { surveyAPI } from '@/lib/api';
import { SURVEY_QUESTIONS, DIMENSION_INFO, LIKERT_SCALE } from '@/lib/questions';
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
    loadQuestions();
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

  const loadQuestions = () => {
    try {
      // Filter questions based on role
      let filteredQuestions = SURVEY_QUESTIONS;
      
      if (formData.role) {
        const surveyRole = ['lecturer', 'it_support', 'admin', 'principal', 'student'].includes(formData.role) ? 'ihl' : 'isp';
        filteredQuestions = SURVEY_QUESTIONS.filter(q => 
          q.role === 'both' || q.role === surveyRole
        );
      }
      
      setQuestions(filteredQuestions);
      
      // Initialize answers with neutral value (3)
      const initialAnswers: Record<number, number> = {};
      filteredQuestions.forEach((q: Question) => {
        initialAnswers[q.id] = 3;
      });
      setFormData(prev => ({ ...prev, answers: initialAnswers }));
    } catch (error) {
      console.error('Error loading questions:', error);
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
      
      if (!formData.is_anonymous) {
        if (!formData.name) newErrors.name = 'Name is required (or select anonymous)';
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
        <h2 className="text-2xl font-semibold text-gray-900">Respondent Information</h2>
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.is_anonymous}
              onChange={(e) => handleInputChange('is_anonymous', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <div>
              <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                Submit anonymously
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Hide your personal information while still receiving complete results
              </p>
            </div>
          </div>
        </div>

        {!formData.is_anonymous && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  label="Full Name *"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  error={errors.name}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10"
                placeholder="+254 700 000 000"
              />
            </div>
          </>
        )}

        {formData.role !== 'service_provider' && (
          <>
            {institutions.length > 0 && (
              <div className="relative">
                <Building className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Select
                  label="Institution (if listed)"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="pl-10"
                  options={[
                    { value: '', label: 'Select institution...' },
                    ...institutions.map(inst => ({ value: inst.id.toString(), label: inst.name }))
                  ]}
                />
              </div>
            )}

            <div className="relative">
              <Building className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                label="Institution Name (if not listed above)"
                type="text"
                value={formData.institution_name}
                onChange={(e) => handleInputChange('institution_name', e.target.value)}
                className="pl-10"
                placeholder="Enter your institution name"
              />
            </div>
          </>
        )}

        <div className="relative">
          <MapPin className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <Input
            label="County *"
            type="text"
            value={formData.county}
            onChange={(e) => handleInputChange('county', e.target.value)}
            className="pl-10"
            placeholder="e.g., Kakamega, Nairobi, Mombasa"
            error={errors.county}
          />
        </div>

        {projects.length > 0 && (
          <Select
            label="Project/Study (Optional)"
            value={formData.project}
            onChange={(e) => handleInputChange('project', e.target.value)}
            options={[
              { value: '', label: 'Select project...' },
              ...projects.map(proj => ({ value: proj.id.toString(), label: proj.name }))
            ]}
          />
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent_given}
              onChange={(e) => handleInputChange('consent_given', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <div>
              <label htmlFor="consent" className="text-sm font-medium text-gray-700">
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
    return (
      <div className="space-y-4">
        {/* Desktop version */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-2">
            {LIKERT_SCALE.map((item) => (
              <span key={item.value} className="text-xs text-gray-500 text-center flex-1 px-1">
                {item.label}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            {LIKERT_SCALE.map((item) => (
              <label key={item.value} className="flex flex-col items-center space-y-2 cursor-pointer flex-1">
                <input
                  type="radio"
                  name={`question-${questionId}`}
                  value={item.value}
                  checked={currentValue === item.value}
                  onChange={() => handleAnswerChange(questionId, item.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{item.value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden space-y-2">
          {LIKERT_SCALE.map((item) => (
            <label key={item.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name={`question-${questionId}`}
                value={item.value}
                checked={currentValue === item.value}
                onChange={() => handleAnswerChange(questionId, item.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <span className="text-lg font-bold text-blue-600">{item.value}</span>
                </div>
              </div>
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
    const dimensionInfo = DIMENSION_INFO[dimension.key as keyof typeof DIMENSION_INFO];

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-3 h-3 rounded-full bg-${dimensionInfo.color}-500`}></div>
            <h2 className="text-2xl font-semibold text-gray-900">{dimensionInfo.title}</h2>
          </div>
          <p className="text-sm text-gray-600">{dimensionInfo.description}</p>
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Instructions:</strong> Please rate your agreement with each statement on a scale of 1 to 5, 
              where 1 = Strongly Disagree and 5 = Strongly Agree.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {dimensionQuestions.length > 0 ? (
            dimensionQuestions.map((question, index) => (
              <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Question {index + 1} of {dimensionQuestions.length}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 leading-relaxed">
                    {question.text}
                  </h3>
                </div>
                {renderLikertScale(question.id, formData.answers[question.id] || 3)}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No questions available for this dimension and role combination.</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const getProgressPercentage = () => {
    return (currentStep / getMaxStep()) * 100;
  };

  const getCurrentStepTitle = () => {
    if (currentStep === 0) return "Personal Information";
    const dimension = DIMENSIONS[currentStep - 1];
    return DIMENSION_INFO[dimension.key as keyof typeof DIMENSION_INFO].title;
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
            <span className="text-sm font-medium text-gray-600">
              {getCurrentStepTitle()}
            </span>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {getMaxStep() + 1}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Start</span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
            <span>Finish</span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {Array.from({ length: getMaxStep() + 1 }, (_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
                {index < getMaxStep() && (
                  <div className={`w-8 h-1 mx-1 transition-colors ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
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
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Submit Assessment</span>
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

        {/* Help text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help? <a href="/contact" className="text-blue-600 hover:text-blue-500">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;