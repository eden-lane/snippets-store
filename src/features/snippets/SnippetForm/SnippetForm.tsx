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
    <Root onSubmit={form.handleSubmit(onSubmit)}>
      <Box direction="column" gap={8} grow={1}>
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
        <Box direction="column" alignItems="flex-start" grow={1}>
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
    </Root>
  );
};

const Root = styled.form`
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 12px;
  background: #212334;
  box-sizing: content-box;
  margin: 0;
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

const EditorWrapper = styled.div`
  flex-grow: 1;
  align-self: stretch;
`;
