import { useForm } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { nanoid } from 'nanoid';
import Editor from '@monaco-editor/react';
import type monaco from 'monaco-editor';
import { useRef } from 'react';

type FormValues = {
  title: string;
  prefix: string;
  description: string;
  languages: string;
};

type Props = {
  onAdd: () => void;
};

export const SnippetForm = (props: Props) => {
  const { onAdd } = props;
  
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const form = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const body = editorRef.current?.getValue() || '';

    if (body) {
      window.api.addSnippet({
        ...data,
        body,
        id: nanoid(),
      });
    }
    onAdd();
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box direction="column" gap={8}>
        <Box justifyContent="space-between" gap={8}>
          <Box direction="column" alignItems="flex-start">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" {...form.register('title')} />
          </Box>
          <Box direction="column" alignItems="flex-start">
            <label htmlFor="prefix">Prefix</label>
            <input id="prefix" type="text" {...form.register('prefix')} />
          </Box>
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            {...form.register('description')}
          />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label>Body</label>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            onMount={handleEditorMount}
          />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="languages">Languages</label>
          <input id="languages" type="text" {...form.register('languages')} />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <button type="submit">Submit</button>
        </Box>
      </Box>
    </form>
  );
};
