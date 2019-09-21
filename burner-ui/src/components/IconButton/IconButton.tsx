import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { L1 } from '../Text';

const StyledLink = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${props => props.color || '#000'};
  margin-left: ${props =>
    typeof props.marginLeft === 'number'
      ? props.marginLeft + 'px'
      : props.marginLeft};
  margin-right: ${props =>
    typeof props.marginRight === 'number'
      ? props.marginRight + 'px'
      : props.marginRight};
`;

export interface IconProps {
  color?: string;
}

const Close: React.FC<IconProps> = ({ color }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      width='3.0866'
      height='19.5407'
      transform='matrix(0.707104 -0.70711 0.707104 0.70711 0 2.18262)'
      fill={color || '#000'}
    />
    <rect
      width='3.0866'
      height='19.5407'
      transform='matrix(-0.707104 -0.70711 -0.707104 0.70711 16 2.18262)'
      fill={color || '#000'}
    />
  </svg>
);

export interface IconLinkProps {
  to: string;
  icon: 'close' | 'back';
  color?: string;
  className?: string;
  marginLeft?: string | number;
  marginRight?: string | number;
}
const IconButton: React.FC<IconLinkProps> = ({
  to,
  icon,
  color,
  className,
  marginLeft,
  marginRight
}) => {
  switch (icon.toLowerCase()) {
    case 'close':
      return (
        <StyledLink
          marginLeft={marginLeft}
          marginRight={marginRight}
          to={to}
          className={className}
        >
          <Close color={color} />
        </StyledLink>
      );
    case 'back':
      return (
        <StyledLink
          marginLeft={marginLeft}
          marginRight={marginRight}
          to={to}
          className={className}
        >
          <L1 as={'span'}>{'\u2190'}</L1>
        </StyledLink>
      );

    default:
      return <div>ICON INVALID</div>;
  }
};

export default IconButton;
