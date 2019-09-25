import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
// import Button from '../../components/Button';
import Page from '../../components/Page';
import PluginElements from '../../components/PluginElements';
import Clipboard from '../../components/Clipboard';
import AccountKeys from '../../data-providers/AccountKeys';
import styled from 'styled-components';
import { Button, Flex, Box, Input, Icon, Tooltip } from 'rimble-ui';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper = styled.section`
  padding: 0 var(--page-margin);
`;

const AdvancedButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

const StyledWrapper = styled(Box)`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    position: relative;
  }
`;

const StyledInput = styled(Input)`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <SectionWrapper>
    <h3>{title}</h3>
    {children}
  </SectionWrapper>
);

interface PrivateKeyProps {
  privateKey: string;
  textLabels?: string;
}
const CopyButton = ({ clipboardText, ...props }) => {
  const text = {
    tooltip: 'Copy to clipboard',
    button: 'Copy'
  };

  if (!props.textLabels) {
    return (
      <Clipboard text={clipboardText}>
        {isCopied => (
          <Tooltip message={text.tooltip}>
            <Button size={'small'} p={0}>
              <Icon name={isCopied ? 'Check' : 'Assignment'} />
            </Button>
          </Tooltip>
        )}
      </Clipboard>
    );
  }
  return (
    <Clipboard text={clipboardText}>
      {isCopied => (
        <Button size={'small'}>{!isCopied ? text.button : 'Copied!'}</Button>
      )}
    </Clipboard>
  );
};
class PrivateKey extends Component<PrivateKeyProps> {
  constructor(props: PrivateKeyProps) {
    super(props);
    this.state = {
      visibleKey: false
    };
  }

  toggleVisible = () => {
    this.setState(prevState => ({
      visibleKey: !prevState.visibleKey
    }));
  };

  render() {
    const { privateKey, textLabels } = this.props;
    return (
      <StyledWrapper>
        <StyledInput
          readOnly
          value={privateKey}
          width={1}
          fontWeight={3}
          pr={textLabels ? '12rem' : '6rem'}
          type={this.state.visibleKey ? 'text' : 'password'}
        />
        <Flex position={'absolute'} right={0} mr={2}>
          <Button
            size={'small'}
            mx={2}
            p={0}
            onClick={() => this.toggleVisible()}
          >
            {this.state.visibleKey ? (
              <Icon name='VisibilityOff' />
            ) : (
              <Icon name='Visibility' />
            )}
          </Button>

          <CopyButton
            clipboardText={privateKey}
            textLabels={this.props.textLabels}
          />
        </Flex>
      </StyledWrapper>
    );
  }
}

const AdvancedPage: React.FC<BurnerContext> = ({ defaultAccount }) => {
  const [showPk, setShowPk] = React.useState(false);
  return (
    <Page title='Advanced' back>
      <AccountKeys
        account={defaultAccount}
        render={keys =>
          keys && (
            <Section title='Private Key'>
              <PrivateKey privateKey={keys.privateKey} />
              <AdvancedButton
                outline
                variant={'danger'}
                onClick={keys.burnAccount}
              >
                Burn PK
              </AdvancedButton>
            </Section>
          )
        }
      />

      <PluginElements position='advanced' />
    </Page>
  );
};

export default withBurner(AdvancedPage);
