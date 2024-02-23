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

export type SnippetDraft = Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>;

export type SnippetCreate = Omit<Snippet, 'createdAt' | 'updatedAt'>;
