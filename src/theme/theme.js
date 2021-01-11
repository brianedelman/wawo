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
    salmon: '#FA9987',
    text: {
      primary: '#222',
      secondary: '#293039',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '3rem', // 48px
      '@media (min-width:600px)': {
        fontSize: '2.25rem', // 36px
      },
    },
    h2: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '2.5rem', // 40px
      '@media (min-width:600px)': {
        fontSize: '1.75rem', // 28px
      },
    },
    h3: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '2.25rem', // 36px
      '@media (min-width:600px)': {
        fontSize: '1.5rem', // 24px
      },
    },
    h4: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '1.250rem', // 20px
      '@media (min-width:600px)': {
        fontSize: '1.25rem', // 18px
      },
    },
    h5: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '1.250rem', // 20px
      '@media (min-width:600px)': {
        fontSize: '1.063rem', // 17px
      },
    },
    h6: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
});

export default theme;
