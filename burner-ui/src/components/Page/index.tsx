// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import Color from 'color';
import styled from 'styled-components';
import { L1 } from '../Text';
import IconButton from '../IconButton';

// const Wrapper = styled.div`
//   height: 100%;
//   background: ${props => props.theme.paperBackground};
//   padding: 16px;
//   border-radius: 4px;
// `;

const TitleBar = styled.div`
  display: flex;
  height: 64px;
  padding: 0 var(--page-margin);
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

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
}

const Page: React.FC<PageProps> = ({ children, title, close, back }) => (
  <div>
    {title && (
      <TitleBar>
        {back && <IconButton icon='back' to='/' marginLeft={-12} />}
        <L1 as={'h1'} margin={0}>
          {title}
        </L1>
        {close && <CloseButton icon='close' to='/' />}
      </TitleBar>
    )}
    <div>{children}</div>
  </div>
);

export default Page;
