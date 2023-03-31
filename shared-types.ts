type EducationItem = {
  school: string;
  course: string;
  duration: string;
  description: string;
};

type ExperienceItem = {
  job: string;
  company: string;
  duration: string;
  description: string;
};

type SkillItem = {
  name: string;
};

type LanguageItem = {
  name: string;
  fluency: 'Elementary' | 'Intermediate' | 'Fluent' | 'Native';
};

export type CvFormValues = {
  cvTemplate?: '';
  basicInfo: {
    profilePicture: string;
    name: string;
    profileIntro: string;
    location: string;
    email: string;
    tel: string;
    linkedIn: string;
    gitHub: string;
    website: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: {
    frontend: SkillItem[];
    backend: SkillItem[];
    tools: SkillItem[];
    general: SkillItem[];
  };
  languages: LanguageItem[];
};

export type Theme = {
  name: string;
  colors: {
    primaryBackground: string;
    secondaryBackground: string;
    primaryTitle: string;
    secondayTitle: string;
    primaryBgTitle: string;
    secondayBgTitle: string;
    primaryText: string;
    secondaryText: string;
    border: string;
  };
};
