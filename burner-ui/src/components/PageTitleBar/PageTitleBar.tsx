import React from 'react';
import styled from 'styled-components';
import IconButton from '../IconButton';
import { L1 } from '../Text';

const TitleBar = styled.div`
  display: flex;
  height: 64px;
  padding: 0 var(--page-margin);
  align-items: center;
  border-bottom: ${props => props.back && '1px solid #F2F2F2'};
  background-color: ${props => props.dark && 'var(--primary-color'};
  color: ${props => props.dark && '#FFF'};
`;

const CloseButton = styled(IconButton)`
  margin-left: auto;
`;

export interface PageProps {
  title?: string;
  close?: boolean;
  back?: boolean;
  dark?: boolean;
  closeAction?: any;
  to?: Object | string;
}

const PageTitleBar: React.FC<PageProps> = ({
  title,
  close,
  back,
  dark,
  closeAction,
  to
}) => (
  <TitleBar back={back}>
    {back && (
      <IconButton
        color={dark && '#FFF'}
        icon='back'
        to={to || '/'}
        marginleft={-12}
      />
    )}
    <L1 as={'h1'} margin={0}>
      {title}
    </L1>
    {close &&
      (closeAction ? (
        <IconButton
          color={dark && '#FFF'}
          icon='close'
          onClick={closeAction}
          marginleft={-12}
        />
      ) : (
        <IconButton
          color={dark && '#FFF'}
          icon='close'
          to='/'
          marginleft={'auto'}
        />
      ))}
  </TitleBar>
);

export default PageTitleBar;
