// @ts-ignore
import React from "react";
import { Link } from "react-router-dom";
import Color from "color";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.paperBackground};
  padding: 16px;
  border-radius: 4px;
  color: ${Color(props => props.theme.paperBackground).isLight()
    ? "#333333"
    : "#EEEEEE"};
`;

const TitleBar = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  height: 64px;
`;



const TextTitle = styled.div`
  font-size: 22px;
  text-align: center;
  flex: 1 0;
  line-height: 64px;
`;

const LinkClose = styled(Link)`
  font-size: 54px;
  text-decoration: none;
  display: block;
  text-align: center;
`;

export interface PageProps {
  children: React.ReactNode;
  title?: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => (
  <Wrapper>
    {title && (
      <TitleBar>
        <TextTitle>{title}</TextTitle>
        <LinkClose to="/">&times;</LinkClose>
      </TitleBar>
    )}
    <div>{children}</div>
  </Wrapper>
);

export default Page;
