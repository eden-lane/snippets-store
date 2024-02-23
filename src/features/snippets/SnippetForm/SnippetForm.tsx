import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { Input } from '../../../ui/components/Input';
import { nanoid } from 'nanoid';
import { Editor } from '../../../ui/components/Editor/Editor';
import { Snippet } from '../../../types';
import { useEffect } from 'react';

type FormValues = {
  title: string;
  prefix: string;
  description: string;
  body: string;
  languages: string;
};

type Props = {
  onAdd: () => void;
  snippet?: Snippet;
};

export const SnippetForm = (props: Props) => {
  const { onAdd, snippet } = props;

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
    window.api.addSnippet({
      ...data,
      id: nanoid(),
    });
    onAdd();
  };

  const handleDelete = () => {
    // window.api.deleteSnippet();
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
          <DeleteButton type="button" onClick={handleDelete}>
            Delete
          </DeleteButton>
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
