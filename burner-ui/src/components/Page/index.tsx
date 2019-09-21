// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { L1 } from '../Text';
import IconButton from '../IconButton';

const TitleBar = styled.div`
  display: flex;
  height: 64px;
`;

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
}

const Page: React.FC<PageProps> = ({ children, title, close, back }) => (
  <>
    {title && (
      <TitleBar>
        {back && <IconButton icon='back' to='/' marginleft={-12} />}
        <L1 as={'h1'} margin={0}>
          {title}
        </L1>
        {close && <IconButton icon='close' to='/' marginleft={'auto'} />}
      </TitleBar>
    )}
    <div>{children}</div>
  </>
);

export default Page;
