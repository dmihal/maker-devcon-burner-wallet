import React from 'react';
import jss from 'jss';
import injectSheet, { ThemeProvider } from 'react-jss';

const defaultTheme = {
  background: '#975422',
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  titleFont: null,
  accentColor: '#f76b1c',
  paperBackground: '#f2f2f2',
  homeButtonColor: null,
};

const rimbleTheme = {
  background: '#fffff',
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  titleFont: null,
  accentColor: '#4e3fce',
  paperBackground: '#ffffff',
  homeButtonColor: null,
};

const styles = (theme: any) => ({
  '@global': {
    body: {
      backgroundColor: theme.background,
      backgroundAttachment: 'fixed',
      fontFamily: theme.font,
      height: '100%',
      width: '100%',
      margin: 0,
      fontSmoothing: 'antialiased',
    },
    html: {
      height: '100%',
      width: '100%',
    },
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 740,
    width: '100%',
    height: '100%;',
    padding: '16px',
    boxSizing: 'border-box',
  },
});

const Container: React.FC<{ classes: any }> = ({ children, classes }) => (
  <div className={classes.container}>
    {children}
  </div>
);

const WrappedContainer = injectSheet(styles)(Container);

const Template: React.FC<{ theme: any }> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={{ ...rimbleTheme}}>
      <WrappedContainer>
        {children}
      </WrappedContainer>
    </ThemeProvider>
  );
};

export default Template;
