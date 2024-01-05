import React from 'react';
import styled from 'styled-components';
import { Property } from 'csstype';

type Props = {
  children: React.ReactNode;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  direction?: Property.FlexDirection;
  gap?: 0 | 2 | 4 | 8 | 16 | 32 | 64;
};

export const Box: React.FC<Props> = (props) => {
  const { children, justifyContent, alignItems, direction, gap = 0 } = props;

  return (
    <Root
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      gap={gap}
    >
      {children}
    </Root>
  );
};

const Root = styled.div<Props>`
  display: flex;
  justify-content: ${(p) => p.justifyContent};
  align-items: ${(p) => p.alignItems};
  flex-direction: ${(p) => p.direction};
  gap: ${(p) => p.gap}px;
`;
