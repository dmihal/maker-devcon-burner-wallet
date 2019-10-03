// @ts-ignore
import React from 'react';
import PageTitleBar from '../PageTitleBar';
import Modals from '../../Modals';
export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
  dark?: boolean;
  className?: string;
}

const Page: React.FC<PageProps> = ({
  children,
  title,
  close,
  back,
  dark,
  className
}) => {
  const TitleBarProps = {
    back: back,
    close: close,
    title: title,
    dark: dark
  };
  return (
    <main className={className}>
      {title && <PageTitleBar {...TitleBarProps} />}
      <div>{children}</div>
      <Modals />
    </main>
  );
};

export default Page;
