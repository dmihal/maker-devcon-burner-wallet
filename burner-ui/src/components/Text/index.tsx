import React, { Component } from 'react';
import styled from 'styled-components';

// This is a modular text component to enforce rules defined in css :root
// It is called using predefined levels (unlimited), but each level must have
// a font-size, line-height, and font-weight.
// it is declared in css :root {} as so:
// --l1-fs = font-size
// --l1-lh = line-height
// --l1-fw = font-weight

const StyledText = styled.p`
  font-size: ${props => 'var(--l' + props.level + '-fs)'};
  line-height: ${props => 'var(--l' + props.level + '-lh)'};
  font-weight: ${props => 'var(--l' + props.level + '-weight)'};
  text-align: ${props =>
    props.center ? 'center' : props.right ? 'right' : props.left && 'left'};
  margin: ${props => props.margin};
  color: ${props => props.color};
  opacity: ${props => props.opacity};
`;

interface LevelProps {
  as: string;
  className?: string;
  center?: Boolean;
  left?: Boolean;
  right?: Boolean;
  margin?: string | number;
  color?: string;
  opacity?: string | number;
}

interface TextProps extends LevelProps {
  level: number;
}

const Text: React.FC<TextProps> = ({
  level,
  as,
  className,
  center,
  left,
  right,
  children,
  margin,
  color,
  opacity
}) => (
  <StyledText
    level={level}
    as={as}
    className={className}
    left={left}
    right={right}
    center={center}
    children={children}
    margin={margin}
    color={color}
    opacity={opacity}
  />
);

const L1: React.FC<LevelProps> = props => <Text level={1} {...props} />;
const L2: React.FC<TextProps> = props => <Text level={2} {...props} />;
const L3: React.FC<TextProps> = props => <Text level={3} {...props} />;

export { L1, L2, L3 };
export default Text;
