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
    title: "Por que seu prompt não funciona (e como consertar)",
    description:
      "A maioria das pessoas trata prompts como pedido pra garçom cansado. Aqui está o método para refinar prompts conversando com a IA e obter resultados de qualidade na primeira tentativa.",
    tags: ["IA", "Prompt Engineering", "Produtividade"],
    url: "https://renatobezerrajunior.medium.com/por-que-seu-prompt-cão-funciona-e-como-consertar-02b7ab820935",
    readTime: "3 min",
    year: "2026",
  },
  {
    id: 2,
    title: "AWS Lambda + MySQL + JWT: Autenticação Serverless",
    description:
      "Como criar um projeto Lambda que conecta a um banco de dados SQL, valida usuários e gera tokens JWT para autenticação.",
    tags: ["AWS Lambda", "Node.js", "JWT", "MySQL"],
    url: "https://renatobezerrajunior.medium.com/implementando-autenticação-com-jwt-em-aws-lambda-conexão-sql-validação-de-usuário-e-geração-de-35932a01255a",
    readTime: "5 min",
    year: "2021",
  },
  {
    id: 3,
    title: "Envio de E-mails com Nodemailer e Gmail SMTP",
    description:
      "Guia completo de configuração do Nodemailer com Express e servidor SMTP do Google para envio de e-mails em Node.js.",
    tags: ["Node.js", "Nodemailer", "Express", "SMTP"],
    url: "https://renatobezerrajunior.medium.com/envio-de-e-mails-com-nodemailer-e-gmail-smtp-4f8c8b1a8c5d",
    readTime: "4 min",
    year: "2021",
  },
  {
    id: 4,
    title: "Incorporando PDF em Páginas Web",
    description:
      "Duas abordagens para embedar PDFs — usando tags nativas do HTML e a biblioteca PDFObject — com dicas de CSS responsivo.",
    tags: ["HTML", "JavaScript", "PDF", "Web"],
    url: "https://renatobezerrajunior.medium.com/incorporando-documentos-em-pdf-no-html-b20747128209",
    readTime: "3 min",
    year: "2020",
  },
  {
    id: 5,
    title: "PnP JS vs SQL: CRUD no SharePoint explicado",
    description:
      "Comparação lado a lado entre PnP JS e SQL para operações de SELECT, INSERT, UPDATE, DELETE e JOINs em listas SharePoint.",
    tags: ["SharePoint", "PnP JS", "SQL", "Microsoft 365"],
    url: "https://renatobezerrajunior.medium.com/pnp-js-vs-sql-crud-no-sharepoint-explicado-3c2b8b1a8c5d",
    readTime: "6 min",
    year: "2020",
  },
];
