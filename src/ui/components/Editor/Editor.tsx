import styled from 'styled-components';
import CodeEditor, { TextareaCodeEditorProps} from '@uiw/react-textarea-code-editor';
import { InputWrapper } from '../InputWrapper';

type Props = TextareaCodeEditorProps;

export const Editor = (props: Props) => {
  const { value, onChange, ...rest } = props;
  
  return (
    <Wrapper>
      <CodeEditor
        {...rest}
        value={value}
        language="jsx"
        placeholder="Snippet body..."
        onChange={onChange}
        padding={8}
        data-color-mode="dark"
        style={{
          borderRadius: 4,
          flexGrow: 1,
          background: '#181a2d',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled(InputWrapper)`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
`;
