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
  survey_type: string;
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
}
export interface Submission {
  recommendations: never[];
  is_anonymous: boolean;
  institution_name: string;
  id: number;
  institution: number;
  name: string;
  role: string;
  gender?: string;
  survey_type: "rafsia" | "isp";
  survey_type_display: string;
  project_name?: string;
  institution_name_display: string;
  county: string;
  overall_score: number;
  readiness_level: string;
  submitted_at: string;
  technical_score: number;
  economic_score: number;
  socio_cultural_score: number;
  environmental_score: number;
  policy_regulatory_score: number;
  scores_by_dimension?: Record<string, number>;
}


// export interface Submission {
//   id: number;
//   name: string;
//   role: string;
//   gender?: string;
//   survey_type: "rafsia" | "isp";
//   survey_type_display: string;
//   project_name?: string;
//   institution_name_display: string;
//   county: string;
//   overall_score: number;
//   readiness_level: string;
//   submitted_at: string;
// }

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
  by_survey_type: any;
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
