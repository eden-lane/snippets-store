import { useForm } from 'react-hook-form';
import { Box } from '../../../ui/components/Box';
import { nanoid } from 'nanoid';
type FormValues = {
  title: string;
  prefix: string;
  description: string;
  body: string;
  languages: string[];
};

export const SnippetForm = () => {
  const form = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    window.api.addSnippet({
      id: nanoid(),
      ...data,
    });
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
          <label htmlFor="body">Body</label>
          <textarea id="body" {...form.register('body')} />
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
