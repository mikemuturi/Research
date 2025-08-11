export interface Question {
  id: number;
  text: string;
  dimension: string;
  role: string;
  order: number;
  is_active: boolean;
}

export interface Answer {
  question: number;
  question_text: string;
  dimension: string;
  value: number;
}

export interface Institution {
  id: number;
  name: string;
  type: string;
  county: string;
  latitude?: number;
  longitude?: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  institution?: number;
  institution_name: string;
  institution_name_display: string;
  county: string;
  project?: number;
  consent_given: boolean;
  is_anonymous: boolean;
  submitted_at: string;
  technical_score: number;
  economic_score: number;
  socio_cultural_score: number;
  environmental_score: number;
  policy_regulatory_score: number;
  overall_score: number;
  readiness_level: string;
  answers: Answer[];
  recommendations: string[];
  scores_by_dimension: {
    technical: number;
    economic: number;
    socio_cultural: number;
    environmental: number;
    policy_regulatory: number;
  };
}

export interface InterviewNote {
  id: number;
  title: string;
  respondent_type: string;
  institution_name: string;
  respondent_name: string;
  respondent_role: string;
  dimension: string;
  question: string;
  response: string;
  key_insights: string;
  interview_date: string;
  interviewer: number;
  interviewer_name: string;
  created_at: string;
  updated_at: string;
}

export interface Statistics {
  total_submissions: number;
  by_role: Record<string, number>;
  by_county: Record<string, number>;
  by_readiness_level: Record<string, number>;
  average_scores: {
    technical: number;
    economic: number;
    socio_cultural: number;
    environmental: number;
    policy_regulatory: number;
    overall: number;
  };
}