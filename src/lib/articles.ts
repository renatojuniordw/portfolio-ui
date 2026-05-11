export interface Article {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
  readTime: string;
  year: string;
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "AWS Lambda + MySQL + JWT: Autenticação Serverless",
    description:
      "Como criar um projeto Lambda que conecta a um banco de dados SQL, valida usuários e gera tokens JWT para autenticação.",
    tags: ["AWS Lambda", "Node.js", "JWT", "MySQL"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "5 min",
    year: "2021",
  },
  {
    id: 2,
    title: "Envio de E-mails com Nodemailer e Gmail SMTP",
    description:
      "Guia completo de configuração do Nodemailer com Express e servidor SMTP do Google para envio de e-mails em Node.js.",
    tags: ["Node.js", "Nodemailer", "Express", "SMTP"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "4 min",
    year: "2021",
  },
  {
    id: 3,
    title: "Incorporando PDF em Páginas Web",
    description:
      "Duas abordagens para embedar PDFs — usando tags nativas do HTML e a biblioteca PDFObject — com dicas de CSS responsivo.",
    tags: ["HTML", "JavaScript", "PDF", "Web"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "3 min",
    year: "2020",
  },
  {
    id: 4,
    title: "PnP JS vs SQL: CRUD no SharePoint explicado",
    description:
      "Comparação lado a lado entre PnP JS e SQL para operações de SELECT, INSERT, UPDATE, DELETE e JOINs em listas SharePoint.",
    tags: ["SharePoint", "PnP JS", "SQL", "Microsoft 365"],
    url: "https://medium.com/@renatobezerrajunior",
    readTime: "6 min",
    year: "2020",
  },
];
