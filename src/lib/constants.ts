const CAREER_START_YEAR = 2017;

export function getYearsOfExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR;
}

export const SOCIALS = {
  personal: {
    insta: "https://instagram.com/renatobezerra.jr",
    linkedin: "https://linkedin.com/in/renato-bezerra",
    github: "https://github.com/renatojuniordw",
    email: "renato-bgs@live.com",
    site: "https://renatobezerra.com.br",
    whatsapp: "https://wa.me/5581986986332",
  },
  barraco: {
    insta: "https://instagram.com/seubarracoesperto",
    youtube: "https://www.youtube.com/@seubarracoesperto",
    tiktok: "https://www.tiktok.com/@seubarracoesperto",
  },
  unificando: {
    insta: "https://instagram.com/unificando.digital",
    site: "https://unificando.com.br",
    pdf: "https://pdf.unificando.com.br",
  },
  oferticando: {
    site: "https://oferticando.com.br",
    insta: "https://instagram.com/oferticando",
  },
};

export const PROFILE = {
  name: "Renato Bezerra",
  fullName: "Renato Bezerra Gomes da Silva Junior",
  handle: "@renatobezerra.jr",
  title: "Engenheiro de Software | Front-end (React, Angular, Next.js) & IA Generativa Aplicada | PCD",
  location: "Paulista, Pernambuco, Brasil",
  summary:
    "Engenheiro de Software com mais de 7 anos de experiência em desenvolvimento front-end, especializado em Angular, React.js e Next.js. Minha atuação abrange desde a implementação técnica até contribuições estratégicas em arquitetura de software, design de soluções, integração de sistemas e testes automatizados. Ao longo da carreira, participei de projetos de alto impacto com soluções para o setor petrolífero, desenvolvendo aplicações escaláveis, performáticas e orientadas às necessidades do negócio.\n\nNos últimos meses, tenho direcionado minha atuação para Inteligência Artificial Generativa aplicada a processos reais, desenvolvendo agentes autônomos por meio de engenharia de prompts, orquestração de fluxos com n8n, implementação de RAG (Retrieval-Augmented Generation) sobre bases de conhecimento e integração com APIs corporativas e públicas para automação de processos.\n\nPossuo conhecimento em arquitetura de software, integração de sistemas e bancos de dados. Sou pós-graduado em Arquitetura de Software pela FIAP e certificado pela Microsoft em HTML5, JavaScript e CSS3, combinando uma base técnica consolidada com foco contínuo em inovação e adoção de tecnologias emergentes.",
  pcdNote:
    "PCD: Deficiência física que não requer adaptações para a realização das atividades profissionais.",
};
