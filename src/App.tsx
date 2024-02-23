import { useEffect, useState } from 'react';
import './App.css';
import { SnippetForm } from './features/snippets/SnippetForm/SnippetForm';
import { SnippetsList } from './features/snippets/SnippetsList/SnippetsList';
import { Snippet, SnippetDraft } from './types';
import styled, { useTheme } from 'styled-components';

function App() {
  const [selected, setSelected] = useState<Snippet | SnippetDraft>();
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

  const handleAdd = () => {
    setSelected({});
  };

  const handleCreate = async (snippet: Snippet) => {
    await window.api.createSnippet(snippet);
    getSnippets();
  };

  const handleUpdate = async (snippet: Snippet) => {
    await window.api.updateSnippet(snippet);
    getSnippets();
  };

  const handleDelete = async (id: string) => {
    await window.api.deleteSnippet(id);
    getSnippets();
  };

  const handleInstall = (snippet: Snippet) => {
    window.api.installSnippet(snippet);
    getSnippets();
  };

  const handleUninstall = (id: string) => {
    window.api.uninstallSnippet(id);
    getSnippets();
  };

  return (
    <Root>
      <SnippetsList
        snippets={snippets}
        selected={selected}
        onAdd={handleAdd}
        onSelect={setSelected}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
      />

      <SnippetForm
        onCreate={handleCreate}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
        snippet={selected}
      />
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
