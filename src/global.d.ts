import { Snippet, SnippetCreate } from './types';

declare global {
  interface Window {
    api: {
      addSnippet: (snippet: SnippetCreate) => void;
      getSnippets: () => Promise<Snippet[]>;
      installSnippet: (snippet: Snippet) => void;
      uninstallSnippet: (snippet: Snippet) => void;
      isSnippetInstalled: (snippet: Snippet) => string[];
    };
  }
}
