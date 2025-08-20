export interface Question {
  id: number;
  text: string;
  dimension: string;
  role: string;
  order: number;
  is_active: boolean;
}

export const SURVEY_QUESTIONS: Question[] = [
  // Technical Readiness Questions
  {
    id: 1,
    text: "Our institution has adequate ICT infrastructure to support satellite internet connectivity",
    dimension: "technical",
    role: "ihl",
    order: 1,
    is_active: true
  },
  {
    id: 2,
    text: "We have reliable power supply to support continuous internet connectivity",
    dimension: "technical",
    role: "both",
    order: 2,
    is_active: true
  },
  {
    id: 3,
    text: "Our technical staff are adequately trained to manage internet connectivity systems",
    dimension: "technical",
    role: "both",
    order: 3,
    is_active: true
  },
  {
    id: 4,
    text: "We have sufficient ICT equipment (computers, tablets, etc.) for our operations",
    dimension: "technical",
    role: "ihl",
    order: 4,
    is_active: true
  },
  {
    id: 5,
    text: "Our organization has the technical capacity to provide satellite internet services",
    dimension: "technical",
    role: "isp",
    order: 5,
    is_active: true
  },
  {
    id: 6,
    text: "We have backup power systems (generators, UPS, solar) to ensure continuous operation",
    dimension: "technical",
    role: "both",
    order: 6,
    is_active: true
  },
  {
    id: 7,
    text: "Our current internet infrastructure can be easily upgraded to satellite technology",
    dimension: "technical",
    role: "both",
    order: 7,
    is_active: true
  },

  // Economic Readiness Questions
  {
    id: 8,
    text: "Our institution can afford the costs associated with satellite internet connectivity",
    dimension: "economic",
    role: "ihl",
    order: 8,
    is_active: true
  },
  {
    id: 9,
    text: "We have sustainable funding mechanisms for ICT infrastructure development",
    dimension: "economic",
    role: "both",
    order: 9,
    is_active: true
  },
  {
    id: 10,
    text: "The cost of satellite internet services is affordable for our target market",
    dimension: "economic",
    role: "isp",
    order: 10,
    is_active: true
  },
  {
    id: 11,
    text: "We have adequate budget allocation for ICT maintenance and upgrades",
    dimension: "economic",
    role: "both",
    order: 11,
    is_active: true
  },
  {
    id: 12,
    text: "Our economic model supports long-term sustainability of internet services",
    dimension: "economic",
    role: "both",
    order: 12,
    is_active: true
  },
  {
    id: 13,
    text: "We have access to funding sources (grants, loans, partnerships) for technology adoption",
    dimension: "economic",
    role: "both",
    order: 13,
    is_active: true
  },
  {
    id: 14,
    text: "The return on investment for satellite internet adoption is acceptable",
    dimension: "economic",
    role: "both",
    order: 14,
    is_active: true
  },

  // Socio-Cultural Readiness Questions
  {
    id: 15,
    text: "Our staff and students are willing to adopt new internet technologies",
    dimension: "socio_cultural",
    role: "ihl",
    order: 15,
    is_active: true
  },
  {
    id: 16,
    text: "The community we serve is ready to embrace satellite internet technology",
    dimension: "socio_cultural",
    role: "both",
    order: 16,
    is_active: true
  },
  {
    id: 17,
    text: "We have programs to promote digital literacy among our users",
    dimension: "socio_cultural",
    role: "both",
    order: 17,
    is_active: true
  },
  {
    id: 18,
    text: "Cultural factors in our region support the adoption of new technologies",
    dimension: "socio_cultural",
    role: "both",
    order: 18,
    is_active: true
  },
  {
    id: 19,
    text: "Our customers have sufficient digital skills to use internet services effectively",
    dimension: "socio_cultural",
    role: "isp",
    order: 19,
    is_active: true
  },
  {
    id: 20,
    text: "There is strong leadership support for technology adoption in our organization",
    dimension: "socio_cultural",
    role: "both",
    order: 20,
    is_active: true
  },
  {
    id: 21,
    text: "Our organization has a culture that embraces innovation and change",
    dimension: "socio_cultural",
    role: "both",
    order: 21,
    is_active: true
  },

  // Environmental Readiness Questions
  {
    id: 22,
    text: "Our institution considers environmental impact in ICT decisions",
    dimension: "environmental",
    role: "ihl",
    order: 22,
    is_active: true
  },
  {
    id: 23,
    text: "We have policies promoting environmentally sustainable ICT practices",
    dimension: "environmental",
    role: "both",
    order: 23,
    is_active: true
  },
  {
    id: 24,
    text: "Our operations minimize negative environmental impacts",
    dimension: "environmental",
    role: "both",
    order: 24,
    is_active: true
  },
  {
    id: 25,
    text: "We promote the use of renewable energy sources for ICT operations",
    dimension: "environmental",
    role: "both",
    order: 25,
    is_active: true
  },
  {
    id: 26,
    text: "Environmental regulations support our satellite internet operations",
    dimension: "environmental",
    role: "isp",
    order: 26,
    is_active: true
  },
  {
    id: 27,
    text: "We have environmental management systems in place",
    dimension: "environmental",
    role: "both",
    order: 27,
    is_active: true
  },
  {
    id: 28,
    text: "Our organization is committed to reducing carbon footprint through technology choices",
    dimension: "environmental",
    role: "both",
    order: 28,
    is_active: true
  },

  // Policy & Regulatory Readiness Questions
  {
    id: 29,
    text: "Existing government policies support satellite internet adoption in our institution",
    dimension: "policy_regulatory",
    role: "ihl",
    order: 29,
    is_active: true
  },
  {
    id: 30,
    text: "Regulatory frameworks are conducive to satellite internet service provision",
    dimension: "policy_regulatory",
    role: "both",
    order: 30,
    is_active: true
  },
  {
    id: 31,
    text: "We have clear institutional policies governing ICT use and management",
    dimension: "policy_regulatory",
    role: "ihl",
    order: 31,
    is_active: true
  },
  {
    id: 32,
    text: "Licensing and regulatory requirements are clear and achievable",
    dimension: "policy_regulatory",
    role: "isp",
    order: 32,
    is_active: true
  },
  {
    id: 33,
    text: "Government support exists for expanding internet connectivity in rural areas",
    dimension: "policy_regulatory",
    role: "both",
    order: 33,
    is_active: true
  },
  {
    id: 34,
    text: "We have data protection and privacy policies in place",
    dimension: "policy_regulatory",
    role: "both",
    order: 34,
    is_active: true
  },
  {
    id: 35,
    text: "Our organization complies with all relevant telecommunications regulations",
    dimension: "policy_regulatory",
    role: "both",
    order: 35,
    is_active: true
  },
  {
    id: 36,
    text: "We have established governance frameworks for ICT decision-making",
    dimension: "policy_regulatory",
    role: "both",
    order: 36,
    is_active: true
  }
];

export const DIMENSION_INFO = {
  technical: {
    title: "Technical Readiness",
    description: "Assess your ICT infrastructure, power supply, equipment, and technical capacity",
    color: "blue"
  },
  economic: {
    title: "Economic Readiness", 
    description: "Evaluate affordability, funding mechanisms, and financial sustainability",
    color: "green"
  },
  socio_cultural: {
    title: "Socio-Cultural Readiness",
    description: "Measure digital literacy, community acceptance, and adoption willingness",
    color: "purple"
  },
  environmental: {
    title: "Environmental Readiness",
    description: "Review environmental impact considerations and sustainability practices",
    color: "emerald"
  },
  policy_regulatory: {
    title: "Policy & Regulatory Readiness",
    description: "Assess policies, regulatory frameworks, and compliance requirements",
    color: "amber"
  }
};

export const LIKERT_SCALE = [
  { value: 1, label: "Strongly Disagree", shortLabel: "SD" },
  { value: 2, label: "Disagree", shortLabel: "D" },
  { value: 3, label: "Neutral", shortLabel: "N" },
  { value: 4, label: "Agree", shortLabel: "A" },
  { value: 5, label: "Strongly Agree", shortLabel: "SA" }
];