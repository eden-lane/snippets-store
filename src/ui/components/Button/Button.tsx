import styled from 'styled-components';

type Props = {
  kind?: 'primary' | 'secondary' | 'danger';
}

export const Button = styled.button<Props>`
  color: white;
  width: 140px;
  height: 28px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  outline: none;
  border: none;

  &:focused, &:active {
    outline: 1px solid #8250df;
  }

  background: ${({ kind }) => {
    switch (kind) {
      case 'secondary':
        return '#212334';
      case 'danger':
        return '#e04848';
      case 'primary':
      default:
        return '#2e3257';
    }
  }};
`;