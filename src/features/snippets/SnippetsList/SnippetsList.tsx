import styled from 'styled-components';
import { Snippet, SnippetDraft } from '../../../types';
import { Button } from '../../../ui/components/Button/Button';

type Props = {
  selected?: Snippet | SnippetDraft;
  snippets: Snippet[];
  onAdd: () => void;
  onSelect: (snippet: Snippet) => void;
  onInstall: (snippet: Snippet) => void;
  onUninstall: (snippet: Snippet) => void;
};

export const SnippetsList = (props: Props) => {
  const { selected, onSelect, snippets, onAdd, onInstall, onUninstall } = props;

  const handleChange =
    (snippet: Snippet) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onInstall(snippet);
      } else {
        onUninstall(snippet);
      }
    };

  return (
    <Root>
      {snippets?.map((snippet) => (
        <ListItem
          key={snippet.id}
          selected={snippet === selected}
          onClick={() => onSelect(snippet)}
        >
          <div>
            {/* <input
              type="checkbox"
              onChange={handleChange(snippet)}
              defaultChecked={snippet.checked}
            /> */}
            {snippet.title}
          </div>
          <div>
            <SnippetPrefix>{snippet.prefix}</SnippetPrefix>
            {/* <Component /> */}
          </div>
        </ListItem>
      ))}
      <Button onClick={onAdd}>Add snippet</Button>
    </Root>
  );
};

const Root = styled.ul`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  background: #212334;
  list-style-type: none;
  width: 240px;
  height: 100%;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0;
  gap: 8px;
  flex-shrink: 0;
`;

const ListItem = styled.li<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 38px;
  font-size: 12px;
  justify-content: start;
  align-items: flex-start;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  outline: 1px solid ${(p) => (p.selected ? '#8250df' : 'transparent')};

  &:hover {
    background: #181a2d;
  }
`;

const SnippetPrefix = styled.em`
  height: 13px;
  width: 125;
  color: #e6e6e699;
`;
