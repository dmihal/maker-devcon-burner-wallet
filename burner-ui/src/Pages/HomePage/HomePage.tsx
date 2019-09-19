import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Color from 'color';

import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import ActionRow from '../../components/ActionRow';
import { Card } from 'rimble-ui';
import PluginElements from '../../components/PluginElements';
import AccountBalance, { AccountBalanceData } from '../../data-providers/AccountBalance';
import History from '../../data-providers/History';
import { SCAN_QR_DATAURI } from '../../constants';
import BalanceRow from './BalanceRow';
import HistoryListEvent from './HistoryListEvent';

const styles = (theme: any) => ({
  balances: {
    padding: 0,
  },
  buttons: {
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '50%',
    boxSizing: 'border-box',
    flex: '0 0 40%',
    listStyle: 'none',
  },
  ActionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    bottom: '16px',
    display: 'flex',
    padding: '8px 0px',
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '95%',
    borderRadius: '8px',
    fontSize: '20px' // To Do: Change to CSS variable
  },
  homeButton: {
    color: '#4e3fce', // To Do: Change to CSS variable
    backgroundColor: 'transparent',
  },
  scanBtn: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: -8,
    height: 72,
    width: 72,
    borderRadius: 100,
    border: 'none',
    backgroundImage: `url("${SCAN_QR_DATAURI}")`,
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: Color(theme.accentColor).lighten(0.2).hsl().string(),
    boxShadow: '0px 0px 8px #999',
  },
  advancedLink: {
    color: Color(theme.paperBackground).isLight() ? '#333333' : '#cccccc',
  },
});

interface HomeButtonProps {
  path: string,
  title: string,
  classes: any,
}

const HomeButton: React.FC<HomeButtonProps> = ({ path, title, classes }) => (
  <li className={classes.buttonContainer}>
    <Button to={path} className={classes.homeButton}>{title}</Button>
  </li>
)

const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
const PK_REGEX = /^(?:0x)?[0-9a-f]{64}$/i;

const HomePage: React.FC<BurnerContext & { classes: any }> = ({ accounts, actions, assets, pluginData, classes }) => (
  <Page>

    <PluginElements position="home-top" />

    {accounts.length > 0 ? (
      <ul className={classes.balances}>
        {assets.map(asset =>
          <AccountBalance
            key={asset.id}
            asset={asset.id}
            account={accounts[0]}
            render={(err: Error, data: AccountBalanceData | null) => (
              <BalanceRow
                asset={asset}
                usdBalance={data && data.usdBalance}
                balance={data && data.displayBalance}
              />
            )}
          />
        )}
      </ul>
    )  : 'Loading'}

    <PluginElements position="home-middle" />

    {/*
    <ul className={classes.buttons}>
      <HomeButton path="/receive" title="Receive" classes={classes} />
      <HomeButton path="/send" title="Send" classes={classes} />
      {pluginData.homeButtons.map(({ title, path }) => (
        <HomeButton title={title} path={path} key={title} classes={classes} />
      ))}
    </ul>
    */}

    {accounts.length > 0 && (
      <History
        account={accounts[0]}
        render={(events: any[]) => events.map(event => (
          <HistoryListEvent
            key={JSON.stringify(event)}
            event={event}
            account={accounts[0]}
            navigateTo={actions.navigateTo}
          />
        ))}
      />
    )}

    <PluginElements position="home-bottom" />

    <Card className={classes.ActionRow}>
      <HomeButton path="/receive" title="Request" classes={classes} />
      <button className={classes.scanBtn} onClick={async () => {
        try {
          const result = await actions.scanQrCode();
          if (pluginData.tryHandleQR(result, { actions })) {
            return;
          } else if (ADDRESS_REGEX.test(result)) {
            actions.navigateTo('/send', { address: result });
          } else if (PK_REGEX.test(result)) {
            actions.callSigner('writeKey', accounts[0], result);
          } else if (result.indexOf(location.origin) === 0) {
            actions.navigateTo(result.substr(location.origin.length));
          }
        } catch (e) {}
      }} />
      <HomeButton path="/send" title="Send" classes={classes} />
      {pluginData.homeButtons.map(({ title, path }) => (
        <HomeButton title={title} path={path} key={title} classes={classes} />
      ))}
    </Card>

    <Link to="/advanced" className={classes.advancedLink}>Advanced</Link>
  </Page>
);

export default injectSheet(styles)(withBurner(HomePage));
