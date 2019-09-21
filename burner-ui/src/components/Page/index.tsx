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

const CloseIcon = (
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
      fill='#CCCCCC'
    />
    <rect
      width='3.0866'
      height='19.5407'
      transform='matrix(-0.707104 -0.70711 -0.707104 0.70711 16 2.18262)'
      fill='#CCCCCC'
    />
  </svg>
);

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
  <Wrapper>
    {title && (
      <TitleBar>
        <L1 as={'h1'} margin={0}>
          {title}
        </L1>
        {close && <CloseButton icon='close' to='/' />}
      </TitleBar>
    )}
    <div>{children}</div>
  </Wrapper>
);

export default Page;
