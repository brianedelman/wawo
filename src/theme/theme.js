import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f05437',
    },
    secondary: {
      main: '#293039',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    pink: '#fbd1d0',
    black: '#222',
    salmon: '#FA9987',
    text: {
      primary: '#293039',
      secondary: '#757575',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      fontSize: '2.25rem', // 36px
      marginBottom: '0.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem', // 48px
      },
    },
    h2: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      marginBottom: '0.5rem',
      fontSize: '1.75rem', // 28px
      '@media (min-width:600px)': {
        fontSize: '2.5rem', // 40px
      },
    },
    h3: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      marginBottom: '0.5rem',
      fontSize: '1.5rem', // 24px
      '@media (min-width:600px)': {
        fontSize: '2.25rem', // 36px
      },
    },
    h4: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      marginBottom: '0.5rem',
      fontSize: '1.25rem', // 18px
      '@media (min-width:600px)': {
        fontSize: '1.250rem', // 20px
      },
    },
    h5: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      marginBottom: '0.5rem',
      fontSize: '1.063rem', // 17px
      '@media (min-width:600px)': {
        fontSize: '1.250rem', // 20px
      },
    },
    h6: {
      fontFamily: '"Mermaid", serif',
      fontWeight: 700,
      marginBottom: '0.5rem',
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '1.25rem', // 18px
      fontWeight: 500,
    },
    overline: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        marginBottom: 16,
      },
    },
    MuiAvatar: {
      root: {
        border: '2px solid #FA9987',
      },
    },
    MuiTooltip: {
      tooltip: {
        padding: '8px 16px',
        fontSize: '0.875rem',
        backgroundColor: '#616161',
      },
      arrow: {
        color: '#616161',
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: '#fff',
        transition: 'unset',
        '&:hover': {
          backgroundColor: '#fafafa',
        },
        '&$focused': {
          backgroundColor: '#fafafa',
        },
      },
    },
  },
});

export default theme;
