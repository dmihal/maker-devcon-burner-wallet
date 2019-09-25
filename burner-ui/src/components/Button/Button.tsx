// @ts-ignore
import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button as RimbleButtonOrig } from 'rimble-ui';

const LinkStyled = styled(Link)`
  display: block;
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.color};
  background: ${props => props.background};
  line-height: 1.5;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;
  height: 48px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export interface ButtonProps {
  onClick?: () => any;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'danger' | 'success';
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
  variant,
  outline
}) => {
  const clickHandler = disabled
    ? (e: MouseEvent) => e.preventDefault()
    : onClick;

  const sharedProps = {
    onClick: clickHandler,
    disabled: disabled,
    variant: variant,
    className: className,
    children: children
  };

  return outline ? (
    <RimbleButtonOrig.Outline {...sharedProps} />
  ) : (
    <RimbleButtonOrig {...sharedProps} />
  );
};

export interface LinkProps {
  to: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'danger' | 'success';
  outline?: boolean;
}
export const BurnerLink: React.FC<LinkProps> = ({
  to,
  disabled,
  children,
  className,
  variant,
  outline
}) => {
  const sharedProps = {
    to: to,
    disabled: disabled,
    variant: variant,
    className: className,
    children: children,
    outline: outline
  };

  return <LinkStyled {...sharedProps} />;
};

export default Button;
