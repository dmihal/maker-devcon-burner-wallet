// @ts-ignore
import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Color from "color";

const ButtonStyled = styled.button`
  display: block;
  background-color: ${props => props.theme.accentColor};
  color: ${Color(props => props.theme.accentColor).luminosity() > 0.6
    ? "#333333"
    : "#EEEEEE"};
  line-height: 1.5;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;
  &:disabled {
    background-color: ${Color(props => props.theme.accentColor)
      .desaturate(0.5)
      .hsl()
      .string()};
    cursor: default;
  }
`;

const LinkStyled = styled(Link)`
  display: block;
  background-color: ${props => props.theme.accentColor};
  color: ${Color(props => props.theme.accentColor).luminosity() > 0.6
    ? "#333333"
    : "#EEEEEE"};
  line-height: 1.5;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;
  &:disabled {
    background-color: ${Color(props => props.theme.accentColor)
      .desaturate(0.5)
      .hsl()
      .string()};
    cursor: default;
  }
`;

export interface ButtonProps {
  to?: string;
  onClick?: () => any;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  disabled,
  children,
  className
}) => {
  const clickHandler = disabled
    ? (e: MouseEvent) => e.preventDefault()
    : onClick;

  if (to) {
    return (
      <LinkStyled
        to={to}
        onClick={clickHandler}
        disabled={disabled}
        className={className}
      >
        {children}
      </LinkStyled>
    );
  } else {
    return (
      <ButtonStyled
        onClick={clickHandler}
        disabled={disabled}
        className={className}
      >
        {children}
      </ButtonStyled>
    );
  }
};

export default Button;
