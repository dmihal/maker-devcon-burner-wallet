import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Color from "color";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: ${props => props.theme.accentColor};
  color: ${Color(props => props.theme.accentColor).luminosity() > 0.6
    ? "#333333"
    : "#EEEEEE"};
  line-height: 1.5;
  border-radius: 4;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;

  :disabled {
    background-color: ${Color(props => props.theme.accentColor)
      .desaturate(0.5)
      .hsl()
      .string()};
    cursor: default;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: ${props => props.theme.accentColor};
  color: ${Color(props => props.theme.accentColor).luminosity() > 0.6
    ? "#333333"
    : "#EEEEEE"};
  line-height: 1.5;
  border-radius: 4;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 20px;

  :disabled {
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
  classes: any;
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
      <Link className={className} to={to} onClick={clickHandler}>
        {children}
      </Link>
    );
  } else {
    return (
      <StyledButton
        className={className}
        onClick={clickHandler}
        disabled={disabled}
      >
        {children}
      </StyledButton>
    );
  }
};

export default ActionRow;
