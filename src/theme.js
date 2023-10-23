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
            main: '#9DC982',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        // Default colors of Evelyne
        // primary: indigo,
        // secondary: orange,
        // error: red,
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
            },
        },
        MuiCard: {
            root: {
                borderRadius: 8,
            },
        },
        MuiFab: {
            root: {
                textTransform: "none",
            },
        },
    },
};

export const Theme = createTheme ({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    ...darkScrollbar(),
                    color: "darkred",
                    backgroundColor: "grey",
                    "& h1": {
                        color: "black"
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
