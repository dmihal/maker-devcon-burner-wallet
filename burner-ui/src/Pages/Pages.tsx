import React, { Component } from 'react';
import { Switch, Router, Route, Redirect, withRouter } from 'react-router-dom';
import { BurnerPluginData } from '../Plugins';
import AdvancedPage from './AdvancedPage';
import ConfirmPage from './ConfirmPage';
// import CreateRequestPage from './CreateRequestPage';
// import DisplayRequestPage from './DisplayRequestPage';
import HomePage from './HomePage';
import ReceiptPage from './ReceiptPage';
import ReceivePage from './ReceivePage';
// import SendPage from './SendPage';
import Onboarding from './Onboarding';

interface PageProps {
  pluginData: BurnerPluginData;
  match: any;
  location: any;
  history: any;
}

const mainRoutes: {
  path: string | any;
  exact?: boolean;
  component: any;
  state?: Object;
}[] = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/send',
    // exact: true,
    component: HomePage
  },
  {
    path: '/receive',
    // exact: true,
    component: HomePage,
    state: { receive: true }
  },
  {
    path: '/welcome',
    component: Onboarding
  },
  {
    path: '/confirm',
    component: ConfirmPage
  },
  {
    path: '/receipt/:asset/:txHash',
    component: ReceiptPage
  },
  {
    path: '/advanced',
    component: AdvancedPage
  }
];

class Pages extends Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    const { match, location, history, pluginData } = this.props;

    return (
      <>
        <Router history={history}>
          {mainRoutes.map(({ path, exact, component }) => (
            <Route
              key={path}
              exact={exact || false}
              path={path}
              component={component}
              location={location}
              history={history}
              match={match}
            />
          ))}
          {pluginData.pages.map(({ path, Component, plugin }) => (
            <Route
              key={path}
              path={path}
              render={props => <Component plugin={plugin} {...props} />}
            />
          ))}
          {/* <Redirect to='/' /> */}
        </Router>
      </>
    );
  }
}

export default withRouter(Pages);
