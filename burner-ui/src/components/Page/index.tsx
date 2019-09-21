// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import Color from 'color';
import styled from 'styled-components';
import { L1 } from '../Text';

// const Wrapper = styled.div`
//   height: 100%;
//   background: ${props => props.theme.paperBackground};
//   padding: 16px;
//   border-radius: 4px;
// `;

const TitleBar = styled.div`
  display: flex;
  height: 64px;
`;

const Corner = styled.div`
  width: 64px;
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

const Wrapper = styled.div`
  padding: var(--page-margin);
`;

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
}

const Page: React.FC<PageProps> = ({ children, title, close, back }) => (
  <Wrapper>
    {title && (
      <TitleBar>
        <L1 margin={0}>{title}</L1>
        {close && <LinkClose to='/'>&times;</LinkClose>}
      </TitleBar>
    )}
    <div>{children}</div>
  </Wrapper>
);

export default Page;
