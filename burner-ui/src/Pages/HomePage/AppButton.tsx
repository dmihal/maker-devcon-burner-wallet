import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Card } from 'rimble-ui';
import Text from '../../components/Text';

const AppCard = styled(Card)`
  display: flex;
  flex: 1;
  border-radius: 8px;
  padding: 16px;
  padding-right: 12px;
  margin: 8px 0px;
  font-weight: 400;
  align-items: center;
  & > span {
    display: block;
  }
`;

const Logo = styled.div`
  height: 64px;
  width: 64px;
  background-color: #999999;
  background-image: ${(props: any) => `url(${props.url})`};
  background-position: center;
  background-size: contain;
  border-radius: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;

  &:hover {
    background: #EEE;
  }
`;

interface AppButtonProps {
  title: string;
  description?: string;
  logo?: string;
}

const AppButton = ({ title, description, logo, path }) => (
  <StyledLink to={path}>
    <AppCard>
      <Box width="60%">
        <Text level={2} as="h3" margin="0" color="#444">
          {title}
        </Text>

        {description && (
          <Text level={3} as="p" margin="0" textAlign="left" color="#999">
            Exchange tokens seamlessly.
          </Text>
        )}
      </Box>
      {logo && (
        <Flex width="40%" flexDirection="column" alignItems="center">
          <Logo url={logo} />
        </Flex>
      )}
    </AppCard>
  </StyledLink>
);

export default AppButton;
