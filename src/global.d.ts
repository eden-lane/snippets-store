import { SnippetCreate } from './types';

declare global {
  interface Window {
    api: {
      addSnippet: (snippet: SnippetCreate) => void;
    };
  }
}
