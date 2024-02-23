import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { Input } from '../../../ui/components/Input';
import { nanoid } from 'nanoid';
import { Editor } from '../../../ui/components/Editor/Editor';
import { Snippet, SnippetDraft } from '../../../types';
import { useEffect } from 'react';
import { isExistingSnippet } from '../../../utils/isExistingSnippet';

type FormValues = {
  title: string;
  prefix: string;
  description: string;
  body: string;
  languages: string;
};

type Props = {
  onCreate: (snippet: Snippet) => void;
  onUpdate: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  snippet?: Snippet | SnippetDraft;
};

export const SnippetForm = (props: Props) => {
  const { onCreate, onUpdate, onDelete, snippet } = props;

  const form = useForm<FormValues>({
    defaultValues: {
      title: snippet?.title || '',
      prefix: snippet?.prefix || '',
      description: snippet?.description || '',
      body: snippet?.body || '',
      languages: snippet?.languages || '',
    },
  });

  useEffect(() => {
    form.reset({
      title: snippet?.title || '',
      prefix: snippet?.prefix || '',
      description: snippet?.description || '',
      body: snippet?.body || '',
      languages: snippet?.languages || '',
    });
  }, [snippet]);

  const onSubmit = (data: FormValues) => {
    if (!snippet) {
      return;
    }

    if (isExistingSnippet(snippet)) {
      onUpdate({
        ...snippet,
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onCreate({
        ...data,
        id: nanoid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleDelete = () => {
    if (isExistingSnippet(snippet)) {
      onDelete(snippet.id);
    }
  };

  return (
    <Root onSubmit={form.handleSubmit(onSubmit)}>
      <Box direction="column" gap={8} grow={1}>
        <Box direction="column" gap={4} alignItems="flex-start">
          <label htmlFor="title">Name</label>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => <Input id="title" {...field} />}
          />
        </Box>
        <Box direction="column" gap={4} alignItems="flex-start">
          <label htmlFor="prefix">Prefix</label>
          <Controller
            control={form.control}
            name="prefix"
            render={({ field }) => <Input id="prefix" {...field} />}
          />
        </Box>

        <Box direction="column" gap={4} alignItems="flex-start">
          <label htmlFor="description">Description</label>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => <Input id="description" {...field} />}
          />
        </Box>
        <Box direction="column" gap={4} alignItems="flex-start" grow={1}>
          <label>Body</label>
          <Controller
            control={form.control}
            name="body"
            render={({ field }) => (
              <Editor
                {...field}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Box>
        <Box direction="column" gap={4} alignItems="flex-start">
          <label htmlFor="languages">Languages</label>
          <Controller
            control={form.control}
            name="languages"
            render={({ field }) => <Input id="languages" {...field} />}
          />
        </Box>
        <Box
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {isExistingSnippet(snippet) && (
            <DeleteButton type="button" onClick={handleDelete}>
              Delete
            </DeleteButton>
          )}
          <SaveButton type="submit">Save</SaveButton>
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

const Button = styled.button`
  color: white;
  width: 140px;
  height: 28px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled(Button)`
  background: #2e3257;
`;

const DeleteButton = styled(Button)`
  background: #e04848;
`;
