import {createTheme } from "@mui/material/styles";
import red from "@mui/material/colors/red";
import {darkScrollbar} from "@mui/material";

const themeOptions = {
    palette: {
        type: "light",
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
    typography: {
        useNextVariants: true,
        fontFamily: "\"Roboto\", serif",
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
            },
        },
        MuiCard: {
            root: {
                borderRadius: 80,
            },
        },
        MuiFab: {
            root: {
                textTransform: "none",
            },
        },
    },
};

export const theme = createTheme ({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    ...darkScrollbar(),
                    color: "darkred",
                    backgroundColor: "grey",
                    "& h1": {
                        color: "blue"
                    }
                }
            }
        }
    },
    ...themeOptions,
});

export const FooterTheme = createTheme({
    ...themeOptions,
    palette: {
        type: "dark",
    },
});
