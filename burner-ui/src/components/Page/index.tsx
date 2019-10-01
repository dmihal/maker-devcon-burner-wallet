// @ts-ignore
import React from 'react';
import PageTitleBar from '../PageTitleBar';

export interface PageProps {
  children: React.ReactNode;
  title?: string;
  close?: boolean;
  back?: boolean;
  dark?: boolean;
  className?: string;
  to?: Object | string;
}

const Page: React.FC<PageProps> = ({
  children,
  title,
  close,
  back,
  dark,
  className,
  to
}) => {
  const TitleBarProps = {
    back: back,
    close: close,
    title: title,
    dark: dark,
    to: to
  };
  return (
    <main className={className}>
      {title && <PageTitleBar {...TitleBarProps} />}
      <div>{children}</div>
    </main>
  );
};

export default Page;
