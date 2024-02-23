import { Snippet, SnippetCreate } from './types';

declare global {
  interface Window {
    api: {
      createSnippet: (snippet: SnippetCreate) => void;
      updateSnippet: (snippet: Snippet) => void;
      deleteSnippet: (id: string) => void;
      getSnippets: () => Promise<Snippet[]>;
      installSnippet: (snippet: Snippet) => void;
      uninstallSnippet: (snippet: Snippet) => void;
      isSnippetInstalled: (snippet: Snippet) => string[];
    };
  }
}
