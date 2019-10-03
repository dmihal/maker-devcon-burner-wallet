import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BurnerPluginData } from '../Plugins';
import ActivityPage from './ActivityPage';
import AdvancedPage from './AdvancedPage';
import ConfirmPage from './ConfirmPage';
import HomePage from './HomePage';
import ReceiptPage from './ReceiptPage';
import Onboarding from './Onboarding';

interface PageProps {
  pluginData: BurnerPluginData;
}

const Pages: React.FC<PageProps> = ({ pluginData }) => (
  <Switch>
    {/* Deeper routes must come before shallower to take precedence over modal wildcards */}
    <Route path='/receipt/:asset/:txHash' component={ReceiptPage} />
    <Route path='/confirm' component={ConfirmPage} />
    <Route path='/activity' exact component={ActivityPage} />
    <Route path='/welcome' exact component={Onboarding} />
    <Route path='/advanced' component={AdvancedPage} />
    <Route path='/' component={HomePage} />

    {pluginData.pages.map(({ path, Component, plugin }) => (
      <Route
        path={path}
        key={path}
        render={props => <Component plugin={plugin} {...props} />}
      />
    ))}
    <Redirect to='/' />
  </Switch>
);

export default Pages;
