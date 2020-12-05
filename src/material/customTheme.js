import { createMuiTheme } from '@material-ui/core';

const themeError = createMuiTheme({
  palette: {
    primary: {
      main: '#c23e69',
    },
    secondary: {
      main: '#3ec5d9',
    },
  },
});

const themeInfo = createMuiTheme({
  palette: {
    primary: {
      main: '#c23e69',
    },
    secondary: {
      main: '#09d928',
    },
  },
});

export { themeError, themeInfo };

