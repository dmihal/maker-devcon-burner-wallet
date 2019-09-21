import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  icon: string;
  color?: string;
  className?: string;
}
const IconButton: React.FC<IconLinkProps> = ({
  to,
  icon,
  color,
  className
}) => (
  <StyledLink to={to} className={className}>
    {icon.toLowerCase() == 'close' && <Close color={color} />}
  </StyledLink>
);

export default IconButton;
