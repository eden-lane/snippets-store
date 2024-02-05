import { useForm } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { nanoid } from 'nanoid';
import Editor from '@monaco-editor/react';
import type monaco from 'monaco-editor';
import { useRef } from 'react';
import styled from 'styled-components';

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
    <MainForm onSubmit={form.handleSubmit(onSubmit)}>
      <Box direction="column" gap={8}>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="title">Name</label>
          <BoxInput id="title" type="text" {...form.register('title')} />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="prefix">Prefix</label>
          <BoxInput id="prefix" type="text" {...form.register('prefix')} />
        </Box>

        <Box direction="column" alignItems="flex-start">
          <label htmlFor="description">Description</label>
          <BoxInput
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
          <BoxInput
            id="languages"
            type="text"
            {...form.register('languages')}
          />
        </Box>
        <Box justifyContent="flex-end">
          <Box direction="column" alignItems="flex-start">
            <SaveButton type="submit">Save</SaveButton>
          </Box>
        </Box>
      </Box>
    </MainForm>
  );
};

const MainForm = styled.form`
  margin-top: 16px;
  margin-left: 16px;
  padding-left: 15px;
  padding-top: 13px;
  padding-bottom: 16px;
  padding-right: 10px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  background: #212334;
  box-sizing: content-box;
  margin-right: 16px;
`;

const BoxInput = styled.input`
  width: 100%;
  height: 26px;
  background: #181a2d;
  border: 0;
  box-sizing: border-box;
  border-radius: 4px;
  color: white;
`;

const SaveButton = styled.button`
  background: #2e3257;
  color: white;
  width: 140px;
  height: 28px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
`;
