import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex } from 'rimble-ui';

const StyledTab = styled(Link)`
  padding: 8px 12px;
  border-radius: 100px;
  background: ${props =>
    props.active ? 'var(--color-primary)' : 'var(--color-secondary)'};
  color: ${props =>
    props.active ? 'var(--color-tertiary)' : 'var(--color-primary)'};
  font-size: 18px;
  text-align: center;
  flex: 1;
  text-decoration: none;
  &:not(:only-child) {
    &:not(:last-of-type) {
      margin-right: calc(0.5 * var(--page-margin));
    }
  }
  &:not(:first-of-type) {
    margin-left: calc(0.5 * var(--page-margin));
  }
`;

interface TabsProps {
  children: React.ReactNodeArray;
}

interface TabItemProps {
  to: string;
  active?: string | null;
  location: any;
}

const Tabs: React.FC<TabsProps> = ({ children }) => (
  <Flex
    pt={3}
    pb={3}
    children={children}
    width={1}
    padding={'0 var(--page-margin)'}
  />
);

const Tab: React.FC<TabItemProps> = ({ active, to, children, location }) => (
  <StyledTab
    active={location.pathname.lastIndexOf(to, 0) === 0 ? 'true' : null}
    to={to}
  >
    {children}
  </StyledTab>
);

export { Tab };
export default Tabs;
