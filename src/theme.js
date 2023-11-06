import {createTheme} from "@mui/material/styles";
import red from "@mui/material/colors/red";


export const theme = createTheme({
  palette: {
    primary: {
      main: '#F49B05',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
