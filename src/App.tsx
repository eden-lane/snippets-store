import { useEffect, useState } from 'react';
import './App.css';
import { SnippetForm } from './features/snippets/SnippetForm/SnippetForm';
import { SnippetsList } from './features/snippets/SnippetsList/SnippetsList';
import { Snippet } from './types';
import styled from 'styled-components';

function App() {
  const [selected, setSelected] = useState<Snippet>();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  console.log(selected)

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
        selected={selected}
        onSelect={setSelected}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
      />

      <SnippetForm onAdd={getSnippets} snippet={selected} />
    </Root>
  );
}

export default App;

const Root = styled.main`
  display: flex;
  box-shadow: 0px 2px 4.5px 0px #00000040;
  gap: 16px;
  width: 100%;
  height: 100%;
`;
