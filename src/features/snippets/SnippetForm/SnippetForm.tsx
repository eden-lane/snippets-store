import { useForm } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { nanoid } from 'nanoid';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';
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
  const [value, setValue] = useState('');
  const { onAdd } = props;

  const form = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (value) {
      window.api.addSnippet({
        ...data,
        body: value,
        id: nanoid(),
      });
    }
    onAdd();
  };

  return (
    <MainForm onSubmit={form.handleSubmit(onSubmit)}>
      <Box direction="column" gap={8}>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="title">Name</label>
          <input id="title" type="text" {...form.register('title')} />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="prefix">Prefix</label>
          <input id="prefix" type="text" {...form.register('prefix')} />
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
          <EditorWrapper>
            <CodeEditor
              value={value}
              language="jsx"
              placeholder="Please enter JS code."
              onChange={(evn) => setValue(evn.target.value)}
              padding={15}
              data-color-mode="dark"
              style={{
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </EditorWrapper>
        </Box>
        <Box direction="column" alignItems="flex-start">
          <label htmlFor="languages">Languages</label>
          <input id="languages" type="text" {...form.register('languages')} />
        </Box>
        <Box direction="column" alignItems="flex-start">
          <button type="submit">Submit</button>
        </Box>
      </Box>
    </MainForm>
  );
};

const MainForm = styled.form`
  height: 580px;
  width: 644px;
  background: #212334;
  margin-top: 75px;
  margin-left: 16px;
  padding-left: 15px;
  padding-top: 13px;
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
  align-self: stretch;
`;
