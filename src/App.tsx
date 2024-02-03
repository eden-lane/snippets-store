import { useEffect, useState } from 'react';
import './App.css';
import { SnippetForm } from './features/snippets/SnippetForm/SnippetForm';
import { SnippetsList } from './features/snippets/SnippetsList/SnippetsList';
import { Snippet } from './types';
import styled from 'styled-components';

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  async function getSnippets() {
    const snippets = await window.api.getSnippets();
    snippets.forEach(async (snippet: Snippet) => {
      const result = await window.api.isSnippetInstalled(snippet);
      console.log(result);
    });

    setSnippets(
      snippets.map((snippet: Snippet) => ({
        ...snippet,
      }))
    );
  }

  useEffect(() => {
    getSnippets();
  }, []);

  const handleInstall = (snippet: Snippet) => {
    window.api.installSnippet(snippet);
  };

  const handleUninstall = (snippet: Snippet) => {
    window.api.uninstallSnippet(snippet);
  };

  return (
    <Root>
      <SnippetsList
        snippets={snippets}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
      />

      <SnippetForm onAdd={getSnippets} />
    </Root>
  );
}

export default App;

const Root = styled.main`
  display: flex;
`;
