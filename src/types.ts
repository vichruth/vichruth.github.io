export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  points: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  link?: string;
  codeHighlight?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  highlightMetric?: {
    value: string;
    label: string;
  };
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: {
    name: string;
    context: string;
    vibe?: string; // e.g. "Core", "Hardware", "Optimization", "Familiar"
  }[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
  gradeLabel: string;
  details: string[];
}

export interface Award {
  id: string;
  title: string;
  sub: string;
  description: string;
  date: string;
  badge?: string;
}
