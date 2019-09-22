// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { L1 } from '../Text';
import IconButton from '../IconButton';
import PageTitleBar from '../PageTitleBar';

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
  dark?: boolean;
}

const Page: React.FC<PageProps> = ({ children, title, close, back, dark }) => {
  const TitleBarProps = {
    back: back,
    close: close,
    title: title,
    dark: dark
  };
  return (
    <>
      {title && <PageTitleBar {...TitleBarProps} />}
      <div>{children}</div>
    </>
  );
};

export default Page;
