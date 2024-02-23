import styled from 'styled-components';
import { InputWrapper } from '../InputWrapper';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  const { value, onChange, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <InputWrapper>
      <Root {...rest} value={value} onChange={handleChange} />
    </InputWrapper>
  );
};

const Root = styled.input`
  width: 100%;
  height: 26px;
  background: #181a2d;
  border: 0;
  padding: 0 8px;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
  outline: none;
`;
