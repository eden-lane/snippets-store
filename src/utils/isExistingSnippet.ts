import { Snippet, SnippetDraft } from '../types';

export const isExistingSnippet = (
  snippet?: Snippet | SnippetDraft
): snippet is Snippet => {
  if (!snippet) {
    return false;
  }

  return 'id' in snippet && !!snippet.id;
};
