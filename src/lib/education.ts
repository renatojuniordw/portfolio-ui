export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export const EDUCATIONS: Education[] = [
  {
    institution: "FIAP",
    degree: "Pós-graduação Lato Sensu - Especialização, Software Architecture",
    period: "Abr 2023 - Mai 2024",
  },
  {
    institution: "FICR - Faculdade Imaculada Conceição do Recife",
    degree: "Graduação, Sistemas para Internet",
    period: "2017 - 2019",
  },
];

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Exam 480: Programming in HTML5 with JavaScript and CSS3",
    issuer: "Microsoft",
  },
  {
    name: "MTA: Introduction to Programming Using JavaScript",
    issuer: "Microsoft",
    year: "2019",
  },
];
