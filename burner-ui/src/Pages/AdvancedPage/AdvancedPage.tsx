import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import PluginElements from '../../components/PluginElements';
import AccountKeys from '../../data-providers/AccountKeys';
import styled from 'styled-components';
import { Flex, Input } from 'rimble-ui';

// import Clipboard from 'react-clipboard.js';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper = styled.section`
  padding: 0 var(--page-margin);
`;

interface CopyProps {
  children: React.ReactNode;
  className?: string;
  toCopy: string;
}

// iOS workaround
// First create the clipboard component, then pass styles through it
const CopyToClipboard: React.FC<CopyProps> = ({
  children,
  toCopy,
  className
}) => (
  <Clipboard button-className={className} data-clipboard-text={toCopy}>
    {children}
  </Clipboard>
);

const CopyButton = styled(CopyToClipboard)`
  width: 100%;
  background-color: var(--color-primary);
  color: #fff;
  font-size: var(--fs-2);
  width: 48px;
  margin-left: 8px;
  border-radius: 4px;
  appearance: none;
`;

const AdvancedButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <SectionWrapper>
    <h3>{title}</h3>
    {children}
  </SectionWrapper>
);

const AdvancedPage: React.FC<BurnerContext> = ({ defaultAccount }) => {
  const [showPk, setShowPk] = React.useState(false);
  return (
    <Page title='Advanced' close>
      <AccountKeys
        account={defaultAccount}
        render={keys =>
          keys && (
            <Section title='Private Key'>
              <Flex>
                <Input
                  flex={1}
                  type={showPk ? 'text' : 'password'}
                  disabled
                  value={keys.privateKey}
                />
                <CopyButton toCopy={keys.privateKey}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z' />
                  </svg>
                </CopyButton>
              </Flex>

              <AdvancedButton outline onClick={() => setShowPk(!showPk)}>
                {showPk ? 'Hide' : 'Show'}
              </AdvancedButton>
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
