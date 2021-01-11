import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f05437',
    },
    secondary: {
      main: '#fbd1d0',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    black: '#222',
  },
});

export default theme;
