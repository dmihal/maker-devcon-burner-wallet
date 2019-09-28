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
  min-width: 160px;
  text-align: center;
`;

interface TabsProps {
  children: React.ReactNodeArray;
  location: any;
}

interface TabItemProps {
  to: string;
  active?: boolean;
  location: any;
}

const Tabs: React.FC<TabsProps> = ({ children }) => (
  <Flex justifyContent='space-between' pt={3} pb={3} children={children} />
);

const Tab: React.FC<TabItemProps> = ({ active, to, children, location }) => (
  <StyledTab
    active={location.pathname.lastIndexOf(to, 0) === 0 && true}
    to={to}
  >
    {children}
  </StyledTab>
);

export { Tab };
export default Tabs;
