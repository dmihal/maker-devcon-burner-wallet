import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex } from 'rimble-ui';

const StyledTab = styled(Link)`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(85, 85, 85);
  background: rgb(247, 247, 247);
  border-radius: 30px;
  padding: 8px 8px;
  font-size: 11px;
  margin-left: 8px;
  outline: none;
  padding: 8px 12px;
  border-radius: 100px;
  background: ${props =>
    props.active ? 'var(--color-primary)' : 'var(--color-secondary)'};
  color: ${props =>
    props.active ? 'var(--color-tertiary)' : 'var(--color-primary)'};
  text-decoration: none;
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
  <Flex children={children} marginRight='0' marginLeft='auto' />
);

const Tab: React.FC<TabItemProps> = ({ active, to, children, location }) => (
  <StyledTab
    active={
      to === '/receive'
        ? location.pathname === '/receive' && 'true'
        : location.pathname.lastIndexOf(to, 0) === 0 && 'true'
    }
    to={to}
  >
    {children}
  </StyledTab>
);

export { Tab };
export default Tabs;
