import React, { Component } from "react";
import styled from "styled-components";

//
// This is a modular text component to enforce rules defined in css :root
// It is called using predefined levels (unlimited), but each level must have
// a font-size, line-height, and font-weight.
// it is declared in css :root {} as so:
// --l1-fs = font-size
// --l1-lh = line-height
// --l1-fw = font-weight

const StyledText = styled.p`
  font-size: ${props => "var(--l" + props.level + "-fs)"};
  line-height: ${props => "var(--l" + props.level + "-lh)"};
  font-weight: ${props => "var(--l" + props.level + "-fw)"};
  text-align: ${props =>
    props.center ? "center" : props.right ? "right" : props.left && "left"};
`;

interface TextProps {
  as: string;
  className?: string;
  center?: Boolean;
  left?: Boolean;
  right?: Boolean;
  level: number;
}

interface LevelProps {
  as: string;
  className?: string;
  center?: Boolean;
  left?: Boolean;
  right?: Boolean;
}

const Text: React.FC<TextProps> = ({
  level,
  as,
  className,
  center,
  left,
  right,
  children
}) => (
  <StyledText
    level={level}
    as={as}
    className={className}
    left={left}
    right={right}
    center={center}
    children={children}
  />
);

const L1: React.FC<LevelProps> = ({
  as,
  className,
  center,
  left,
  right,
  children
}) => (
  <Text
    level={1}
    as={as}
    className={className}
    left={left}
    right={right}
    center={center}
    children={children}
  />
);

const L2: React.FC<TextProps> = ({
  as,
  className,
  center,
  left,
  right,
  children
}) => (
  <Text
    level={2}
    as={as}
    className={className}
    left={left}
    right={right}
    center={center}
    children={children}
  />
);

const L3: React.FC<TextProps> = ({
  as,
  className,
  center,
  left,
  right,
  children
}) => (
  <Text
    level={3}
    as={as}
    className={className}
    left={left}
    right={right}
    center={center}
    children={children}
  />
);

export { L1, L2, L3 };
export default Text;
