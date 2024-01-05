export type Snippet = {
  id: string;
  title: string;
  prefix: string;
  description: string;
  body: string;
  languages: string[];
  createdAt: string;
  updatedAt: string;
};

export type SnippetCreate = Omit<Snippet, 'createdAt' | 'updatedAt'>;
