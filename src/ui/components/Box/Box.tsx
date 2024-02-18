import React from 'react';
import styled from 'styled-components';
import { Property } from 'csstype';

type Props = {
  children: React.ReactNode;
  grow?: 0 | 1;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  alignSelf?: Property.AlignSelf;
  direction?: Property.FlexDirection;
  gap?: 0 | 2 | 4 | 8 | 16 | 32 | 64;
};

export const Box: React.FC<Props> = (props) => {
  const {
    children,
    justifyContent,
    alignItems,
    alignSelf,
    direction,
    grow = 0,
    gap = 0,
  } = props;

  return (
    <Root
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      gap={gap}
      grow={grow}
      alignSelf={alignSelf}
    >
      {children}
    </Root>
  );
};

const Root = styled.div<Props>`
  display: flex;
  justify-content: ${(p) => p.justifyContent};
  align-items: ${(p) => p.alignItems};
  align-self: ${(p) => p.alignSelf};
  flex-direction: ${(p) => p.direction};
  flex-grow: ${(p) => p.grow};
  gap: ${(p) => p.gap}px;
`;
