import styled from 'styled-components';
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
    <Root>
      {snippets?.map((snippet) => (
        <Line key={snippet.id}>
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
        </Line>
      ))}
    </Root>
  );
};

const Root = styled.ul`
  background: #212334;
  list-style-type: none;
  width: 240px;
  height: 610px;
  border-radius: 4px;
  padding-left: 0;
  padding-top: 55px;
  margin-top: 45px;
`;

const Line = styled.li`
  font: inter;
  display: flex;
  flex-direction: column;
  height: 38px;
  width: 224px;
  background: #1f2130;
  font-size: 12px;
  justify-content: start;
  margin: 8px 18px;
  align-items: flex-start;
`;

const SnippetPrefix = styled.em`
  height: 13px;
  width: 125;
  color: #e6e6e699;
`;
