import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import PluginElements from '../../components/PluginElements';
import AccountKeys from '../../data-providers/AccountKeys';
import styled from 'styled-components';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper = styled.section`
  padding: 0 var(--page-margin);
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
              <div style={{ display: 'flex' }}>
                <Button onClick={() => setShowPk(!showPk)}>
                  {showPk ? 'Hide' : 'Show'} PK
                </Button>
                <Button
                  onClick={() => navigator.clipboard.writeText(keys.privateKey)}
                >
                  Copy PK
                </Button>
              </div>

              <div>
                <Button onClick={keys.burnAccount}>Burn PK</Button>
              </div>
            </Section>
          )
        }
      />

      <PluginElements position='advanced' />
    </Page>
  );
};

export default withBurner(AdvancedPage);
