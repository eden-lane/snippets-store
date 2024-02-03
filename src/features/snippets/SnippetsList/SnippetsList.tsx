import { Snippet } from '../../../types';

type Props = {
  snippets: Snippet[];
  onInstall: (snippet: Snippet) => void;
  onUninstall: (snippet: Snippet) => void;
};

export const SnippetsList = (props: Props) => {
  const { snippets, onInstall, onUninstall } = props;

  const handleChange =
    (snippet: Snippet) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onInstall(snippet);
      } else {
        onUninstall(snippet);
      }
    };

  return (
    <ul>
      {snippets?.map((snippet) => (
        <li key={snippet.id}>
          <div>
            <input
              type="checkbox"
              onChange={handleChange(snippet)}
              defaultChecked={snippet.checked}
            />
            {snippet.title}
          </div>
          <div>{snippet.prefix}</div>
        </li>
      ))}
    </ul>
  );
};
