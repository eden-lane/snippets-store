import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { Input } from '../../../ui/components/Input';
import { nanoid } from 'nanoid';
import { Editor } from '../../../ui/components/Editor/Editor';

type FormValues = {
  title: string;
  prefix: string;
  description: string;
  body: string;
  languages: string;
};

type Props = {
  onAdd: () => void;
};

export const SnippetForm = (props: Props) => {
  const { onAdd } = props;

  const form = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    window.api.addSnippet({
      ...data,
      id: nanoid(),
    });
    onAdd();
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
