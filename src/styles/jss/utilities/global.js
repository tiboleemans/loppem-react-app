import {styled} from "@mui/system";
import {lighten} from "@mui/material/styles";

export const GlobalStyleVariables = styled('div')(({theme}) => ({
  // Variables
  "--topbar-mobile-width": "220px",
  "--topbar-height": "64px",
  "--sidenav-width": "260px",
  "--sidenav-button-width": "220px",
  "--sidenav-compact-width": "80px",
  "--contained-layout-width": "1200px",
  "--primary": convertHexToRGB(theme.palette.primary.main),
  "--secondary": convertHexToRGB(theme.palette.secondary.main),
  "--error": convertHexToRGB(theme.palette.error.main),
  "--body": convertHexToRGB(theme.palette.text.primary),
  "--bg-default": theme.palette.background.default,
  "--bg-paper": theme.palette.background.paper,
  "--text-body": theme.palette.text.primary,
  "--text-muted": theme.palette.text.secondary,
  "--text-disabled": theme.palette.text.disabled,
  "--text-hint": theme.palette.text.hint,
  "--font": theme.typography.fontFamily,
  "--font-caption": generateFontProperty(theme.typography.caption),
  "--font-h1": generateFontProperty(theme.typography.h1),
  "--font-h2": generateFontProperty(theme.typography.h2),
  "--font-h3": generateFontProperty(theme.typography.h3),
  "--font-h4": generateFontProperty(theme.typography.h4),
  "--font-h5": generateFontProperty(theme.typography.h5),
  "--font-h6": generateFontProperty(theme.typography.h6),
  "--font-overline": generateFontProperty(theme.typography.overline),
  "--font-body-1": generateFontProperty(theme.typography.body1),
  "--font-body-2": generateFontProperty(theme.typography.body2),
  "--font-subtitle-1": generateFontProperty(theme.typography.subtitle1),
  "--font-subtitle-2": generateFontProperty(theme.typography.subtitle2),
  "--font-button": generateFontProperty(theme.typography.button),
  "--font-headline": "400 24px/32px var(--font)",
  "--font-title": "500 18px/26px var(--font)",
  "--font-display-1": "400 34px/40px var(--font)",
  "--font-display-2": "400 45px/48px var(--font)",
  "--font-display-3": "400 56px/56px var(--font)",
  "--font-display-4": "300 112px/112px var(--font)",

  // typography
  ".h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6": {
    margin: "0 0 0.5rem",
    lineHeight: "1.1",
    color: "inherit",
  },
  ".h1, h1": {fontSize: "2rem"},
  ".h2, h2": {fontSize: "1.75rem"},
  ".h3, h3": {fontSize: "1.5rem"},
  ".h4, h4": {fontSize: "1.25rem"},
  ".h5, h5": {fontSize: "1rem"},
  ".h6, h6": {fontSize: "0.875rem"},
  a: {textDecoration: "none", color: "inherit"},
  ".caption": {font: "var(--font-caption)"},
  ".subtitle-1": {font: "var(--font-subtitle-1)"},
  ".subtitle-2": {font: "var(--font-subtitle-2)"},
  ".heading": {font: "var(--font-heading)"},
  ".title": {font: "var(--font-title)"},
  ".display-1": {font: "var(--font-display-1)"},
  ".display-2": {font: "var(--font-display-2)"},
  ".display-3": {font: "var(--font-display-3)"},
  ".display-4": {font: "var(--font-display-4)"},
  ".capitalize": {textTransform: "capitalize !important"},
  ".uppercase": {textTransform: "uppercase !important"},
  ".lowercase": {textTransform: "lowercase !important"},
  ".font-normal": {fontWeight: "normal !important"},
  ".font-light": {fontWeight: "300 !important"},
  ".font-medium": {fontWeight: "500 !important"},
  ".font-semibold": {fontWeight: "600 !important"},
  ".font-bold": {fontWeight: "700 !important"},
  ".font-italic": {fontStyle: "italic !important"},
  ".text-13": {fontSize: "13px !important"},
  ".text-14": {fontSize: "14px !important"},
  ".text-16": {fontSize: "16px !important"},
  ".text-18": {fontSize: "18px !important"},
  ".text-20": {fontSize: "20px !important"},
  ".text-22": {fontSize: "22px !important"},
  ".text-24": {fontSize: "24px !important"},
  ".text-28": {fontSize: "28px !important"},
  ".text-30": {fontSize: "30px !important"},
  ".text-32": {fontSize: "32px !important"},
  ".text-36": {fontSize: "36px !important"},
  ".text-40": {fontSize: "40px !important"},
  ".text-44": {fontSize: "44px !important"},
  ".text-48": {fontSize: "48px !important"},
  ".text-54": {fontSize: "54px !important"},
  ".text-58": {fontSize: "58px !important"},
  ".text-62": {fontSize: "62px !important"},
  ".text-72": {fontSize: "72px !important"},
  ".text-small": {fontSize: "0.8125rem !important"},
  ".whitespace-pre-wrap": {whiteSpace: "pre-wrap", wordBreak: "break-word"},
  ".whitespace-pre": {whiteSpace: "pre"},
  ".whitespace-no-wrap": {whiteSpace: "nowrap"},

  // spacing
  ".px-80": {
    paddingRight: "80px",
    paddingLeft: "80px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "16px",
      paddingLeft: "16px",
    },
  },
  ".px-sm-30": {
    padding: "0px 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 16px",
    },
  },
  ".p-sm-24": {
    padding: "24px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "16px !important",
    },
  },
  ".px-sm-24": {
    padding: "0px 24px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 12px !important",
    },
  },
  ".pt-sm-24": {
    paddingTop: "24px !important",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "16px !important",
    },
  },
  ".pl-sm-24": {
    paddingLeft: "24px !important",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px !important",
    },
  },
  ".m-auto": {margin: "auto !important"},
  ".mx-auto": {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  ".my-auto": {
    marginTop: "auto !important",
    marginBottom: "auto !important",
  },
  ".m-sm-30": {
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
      margin: "16px",
    },
  },
  ".mb-sm-30": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
    },
  },
  ".w-full": {width: "100%"},
  ".max-w-full": {maxWidth: "100% !important"},
  ".min-w-full": {minWidth: "100% !important"},
  ".w-full-screen": {width: "100vw"},
  ".min-w-750": {minWidth: "750px"},
  ".max-w-450": {maxWidth: "450px"},
  ".max-w-550": {maxWidth: "550px"},
  ".max-w-600": {maxWidth: "600px"},
  ".max-h-500": {maxHeight: "500px"},
  ".max-w-770": {maxWidth: "770px"},
  ".min-h-full": {minHeight: "100% !important"},
  ".h-full": {height: "100% !important"},
  ".h-auto": {height: "auto"},
  ".h-full-screen": {height: "98vh"},
  ".h-150px": {height: "150px !important"},
  ".size-36": {height: "36px !important", width: "36px !important"},
  ".size-24": {height: "24px !important", width: "24px !important"},
  ...generateMarginPadding(0, 25, 0.25, "rem"),
  ...generateMarginPadding(1, 16, 1, "px"),
  ...generateMarginPadding(-25, -1, 0.25, "rem"),
  ...generateMarginPadding(-16, -1, 1, "px"),
  ...generateHeightWidh(),

  // shadows
  ...generateShadows(theme),

  // positionings

  ".hidden": {display: "none"},
  ".block": {display: "block !important"},
  ".inline-block": {display: "inline-block !important"},
  ".flex": {display: "flex"},
  ".flex-column": {display: "flex", flexDirection: "column"},
  ".flex-wrap": {flexWrap: "wrap"},
  ".justify-start": {justifyContent: "flex-start !important"},
  ".justify-center": {justifyContent: "center"},
  ".justify-end": {justifyContent: "flex-end"},
  ".justify-between": {justifyContent: "space-between !important"},
  ".justify-around": {justifyContent: "space-around"},
  ".items-center": {alignItems: "center"},
  ".items-start": {alignItems: "flex-start"},
  ".items-end": {alignItems: "flex-end"},
  ".items-stretch": {alignItems: "stretch"},
  ".flex-grow": {flexGrow: "1"},
  ".overflow-auto": {overflow: "auto !important"},
  ".overflow-hidden": {overflow: "hidden !important"},
  ".overflow-unset": {overflow: "unset !important"},
  ".overflow-visible": {overflow: "visible !important"},
  ".scroll-y": {overflowX: "hidden", overflowY: "scroll"},
  ".relative": {position: "relative"},
  ".position-bottom": {position: "absolute", bottom: "0"},
  ".text-center": {textAlign: "center"},
  ".align-middle": {verticalAlign: "middle"},
  ".text-right": {textAlign: "right"},
  ".text-left": {textAlign: "left"},
  ".x-center": {left: "50%", transform: "translateX(-50%)"},
  ".y-center": {top: "50%", transform: "translateY(-50%)"},

  // landing
  ".landing": {color: "rgba(0, 0, 0, 0.87)", overflow: "hidden"},
  ".landing p": {color: "rgba(var(--body), 0.74)"},
  ".landing a": {textDecoration: "none"},
  ".landing div, .landing section": {boxSizing: "border-box"},
  ".section-intro": {paddingTop: "7.5rem !important"},
  ".section": {
    padding: "3rem 0 2rem 0 ",

    "& .section__header": {
      margin: "0 0 32px",
      h2: {
        fontSize: 32,
        fontWeight: 700,
        margin: "0 0 16px",
      },
      p: {
        fontSize: 16,
        maxWidth: "36rem",
        margin: 0,
      },
    },
  },
  ".container": {
    padding: "0px 1rem",
    maxWidth: "1170px",
    margin: "0 auto",
  },
  ".header": {
    position: "fixed",
    width: "100%",
    top: "0",
    background: "var(--bg-paper)",
    left: "0",
    right: "0",
    padding: "20px 0",
    transition: "padding 0.3s linear",
    zIndex: "999999",
  },
  ".header.header-fixed": {
    padding: "10px 0",
    background: "#ffffff",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28)",
    zIndex: "999",
  },
  ".header .header-container": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ".header .header-container .brand": {
    display: "flex",
    alignItems: "center",
  },
  ".header .header-container .brand img": {},
  ".header .header-container ul.navigation": {
    listStyle: "none",
    margin: "0 0 0 30px",
    padding: "0",
  },
  ".header .header-container ul.navigation li": {display: "inline-block"},
  ".header .header-container ul.navigation li a": {
    display: "flex",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "8px 15px",
    fontWeight: "700",
    borderRadius: "4px",
    transition: "all 0.3s ease-in",
  },
  ".header .header-container ul.navigation li a:hover": {
    background: "#f0f0f0",
  },
  ".header .header-container .header__toggle": {display: "none"},
  "@media only screen and (max-width: 767px)": {
    ".header": {
      width: "var(--topbar-mobile-width)",
      height: "100vh",
      left: "auto",
      right: "0",
      padding: "20px 0 !important",
      boxShadow:
        "-2px 0 4px rgba(0, 0, 0, 0.14), -2px 4px 8px rgba(0, 0, 0, 0.28) !important",
      transition: "all 0.3s ease-in-out",
    },
    ".header.closed": {
      right: "calc(-1 * var(--topbar-mobile-width) - 5px)",
    },
    ".header.closed .header__toggle": {
      color: "rgba(0, 0, 0, 0.87)",
      background: "#ffffff",
      boxShadow:
        "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    },
    ".header .header__toggle": {
      top: "10px",
      right: "15px",
      color: "rgba(0, 0, 0, 0.87)",
      position: "fixed",
      display: "inline-block !important",
      transition: "all 0.3s ease-in-out",
    },
    ".header .header-container": {
      flexDirection: "column",
      padding: "0",
      height: "100%",
    },
    ".header .header-container .brand": {
      padding: "0 20px 20px",
      width: "100%",
    },
    ".header .header-container ul.navigation": {margin: "0", width: "100%"},
    ".header .header-container ul.navigation li": {display: "block"},
    ".header .header-container ul.navigation li a": {
      padding: "15px 20px",
      borderRadius: "0",
    },
  },
  // common
  ".circular-image-small": {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  ".card": {transition: "all 0.3s ease"},
  ".card:hover": {boxShadow: theme.shadows[12]},
  ".card-title": {
    fontSize: "1rem",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  ".card-subtitle": {fontSize: "0.875rem", color: "var(--text-muted)"},
  ".theme-dark .card-subtitle": {color: "rgba(255, 255, 255, 0.54)"},
  ".hide-on-mobile": {display: "inherit"},
  "@media screen and (max-width: 767px)": {
    ".hide-on-mobile": {display: "none !important"},
    ".show-on-mobile": {display: "inherit !important"},
    ".invisible-on-pc": {visibility: "visible"},
  },
  "@media screen and (min-width: 1200px)": {
    ".hide-on-pc": {display: "none !important"},
  },
  "@media screen and (max-width: 1200px)": {
    ".show-on-pc": {display: "none !important"},
  },
  ".VictoryContainer svg": {height: "100% !important"},
  ".box-shadow-none": {boxShadow: "none !important"},
  ".circle-44": {height: "44px !important", width: "44px !important"},
  ".circle-32": {
    height: "32px !important",
    minHeight: "32px !important",
    width: "32px !important",
  },
  ".circle-32 .MuiFab-root": {minHeight: "32px !important"},
  ".circle-32 .MuiIcon-root": {fontSize: "13px !important"},
  ".show-on-mobile": {display: "none !important"},
  ".invisible-on-pc": {visibility: "hidden"},
  ".highlight-js pre": {whiteSpace: "pre-line"},
  ".cursor-pointer": {
    cursor: "pointer",
  },
  ".cursor-move": {
    cursor: "move",
  },

  // color
  ".bg-primary": {background: `${theme.palette.primary.main} !important`},
  ".bg-secondary": {background: `${theme.palette.secondary.main} !important`},
  ".bg-green": {
    backgroundColor: "rgba(157, 201, 130, 0.2) !important",
    background: "#9DC982 !important",
  },
  ".bg-orange": {
    backgroundColor: "rgba(244, 155, 5, 1) !important",
    background: "#F49B05 !important",
  },
  ".bg-error": {
    background: `${theme.palette.error.main} !important`,
    color: "white !important",
  },
  ".bg-white": {background: "#fff !important", color: "inherit"},
  ".bg-default": {background: `${theme.palette.background.default} !important`},
  ".bg-paper": {background: `${theme.palette.background.paper}`},
  ".bg-light-gray": {background: "rgba(0, 0, 0, 0.03) !important"},
  ".bg-dark": {background: "#000000", color: "#fff"},
  ".bg-light-dark": {background: "#212121", color: "white"},
  ".hover-bg-primary": {transition: "all 250ms"},
  ".hover-bg-primary:hover": {
    background: `${theme.palette.primary.main} !important`,
    color: "#ffffff",
    backgroundColor: `${theme.palette.primary.main} !important`,
    fallbacks: [{color: "white !important"}],
  },
  '.hover-bg-primary:hover [class^="MuiSvgIcon-"]': {
    fill: "white !important",
  },
  ".bg-light-primary": {
    background: `rgba(var(--primary), 0.15) !important`,
  },
  ".bg-light-secondary": {
    background: `${lighten(theme.palette.secondary.main, 0.85)} !important`,
  },
  ".bg-light-error": {
    background: `${lighten(theme.palette.error.main, 0.85)} !important`,
  },
  ".section-bg-light-primary": {background: "rgba(var(--primary),0.1)"},
  ".bg-light-green": {background: "rgba(8, 173, 108, 0.5) !important"},
  ".bg-transparent": {background: "transparent !important"},
  ".text-white": {color: "#fff !important"},
  ".text-black": {color: "rgba(0, 0, 0, 0.87) !important"},
  ".text-white-secondary": {color: "rgba(255, 255, 255, 0.87) !important"},
  ".text-muted-white": {color: "rgba(255, 255, 255, 0.54) !important"},
  ".text-light-white": {color: "rgba(255, 255, 255, 0.54) !important"},
  ".text-muted": {color: `${theme.palette.text.secondary} !important`},
  ".text-hint": {color: `${theme.palette.text.hint} !important`},
  ".text-gray": {color: "rgba(0, 0, 0, 0.74) !important"},
  ".text-brand": {color: `${theme.palette.primary.main} !important`},
  ".text-primary": {color: `${theme.palette.primary.main} !important`},
  ".text-secondary": {color: `${theme.palette.secondary.main} !important`},
  ".text-error": {color: `${theme.palette.error.main} !important`},
  ".text-green": {color: "#08ad6c !important"},
  ".text-inherit": {color: "inherit !important"},
  ".gray-on-hover": {transition: "background 250ms ease"},
  ".gray-on-hover:hover": {background: "rgba(0, 0, 0, 0.054)"},
  ".border-color-white": {borderColor: "#ffffff !important"},
  ".border-color-primary": {
    borderColor: `${theme.palette.primary.main} !important`,
  },
  ".border-color-default": {
    borderColor: `${theme.palette.background.default} !important`,
  },
  ".border-color-paper": {
    borderColor: `${theme.palette.background.paper} !important`,
  },

  // border
  ".border-radius-0": {borderRadius: "0px !important", overflow: "hidden"},
  ".border-radius-4": {borderRadius: "4px !important", overflow: "hidden"},
  ".border-radius-8": {borderRadius: "8px !important", overflow: "hidden"},
  ".border-radius-12": {
    borderRadius: "12px !important",
    overflow: "hidden"
  },
  ".border-radius-circle": {borderRadius: "50% !important"},
  ".border-none": {border: "none !important"},
  ".border-transparent": {border: "1px solid transparent !important"},
  ".rounded": {
    borderRadius: "300px !important",
    overflow: "hidden !important"
  },
  ".rounded-l": {
    borderTopLeftRadius: "300px !important",
    borderBottomLeftRadius: "300px !important",
    overflow: "hidden !important"
  },
  ".rounded-r": {
    borderTopRightRadius: "300px !important",
    borderBottomRightRadius: "300px !important",
    overflow: "hidden !important"
  },

  // animations
  ".fade-in": {
    animation: "fade-in 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
  },
  "@keyframes fade-in": {from: {opacity: "0"}, to: {opacity: "1"}},
  "@keyframes spin": {
    "0%": {transform: "rotate(0)"},
    "100%": {transform: "rotate(360deg)"}
  },
  ".spin": {animation: "spin 3s infinite linear"}

}));

const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) return hex.slice(5, 12).replace(/ /g, "");

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

const generateFontProperty = (fontObject) => {
  return `${fontObject.fontWeight} ${fontObject.fontSize}/${fontObject.lineHeight} ${fontObject.fontFamily}`;
};

const generateMarginPadding = (
  start = 0,
  end = 25,
  increament = 0.25,
  unit = "rem"
) => {
  const classList = {};

  for (let i = start; i <= end; i++) {
    classList[`.m-${i}${unit === "px" ? "px" : ""}`] = {
      margin: `${i * increament}${unit} !important`,
    };
    classList[`.mt-${i}${unit === "px" ? "px" : ""}`] = {
      marginTop: `${i * increament}${unit} !important`,
    };
    classList[`.mb-${i}${unit === "px" ? "px" : ""}`] = {
      marginBottom: `${i * increament}${unit} !important`,
    };
    classList[`.mr-${i}${unit === "px" ? "px" : ""}`] = {
      marginRight: `${i * increament}${unit} !important`,
    };
    classList[`.ml-${i}${unit === "px" ? "px" : ""}`] = {
      marginLeft: `${i * increament}${unit} !important`,
    };
    classList[`.mx-${i}${unit === "px" ? "px" : ""}`] = {
      marginLeft: `${i * increament}${unit} !important`,
      marginRight: `${i * increament}${unit} !important`,
    };
    classList[`.my-${i}${unit === "px" ? "px" : ""}`] = {
      marginTop: `${i * increament}${unit} !important`,
      marginBottom: `${i * increament}${unit} !important`,
    };

    classList[`.p-${i}${unit === "px" ? "px" : ""}`] = {
      padding: `${i * increament}${unit} !important`,
    };
    classList[`.pt-${i}${unit === "px" ? "px" : ""}`] = {
      paddingTop: `${i * increament}${unit} !important`,
    };
    classList[`.pb-${i}${unit === "px" ? "px" : ""}`] = {
      paddingBottom: `${i * increament}${unit} !important`,
    };
    classList[`.pr-${i}${unit === "px" ? "px" : ""}`] = {
      paddingRight: `${i * increament}${unit} !important`,
    };
    classList[`.pl-${i}${unit === "px" ? "px" : ""}`] = {
      paddingLeft: `${i * increament}${unit} !important`,
    };
    classList[`.px-${i}${unit === "px" ? "px" : ""}`] = {
      paddingLeft: `${i * increament}${unit} !important`,
      paddingRight: `${i * increament}${unit} !important`,
    };
    classList[`.py-${i}${unit === "px" ? "px" : ""}`] = {
      paddingTop: `${i * increament}${unit} !important`,
      paddingBottom: `${i * increament}${unit} !important`,
    };
  }

  return classList;
};

const generateHeightWidh = (
  start = 0,
  end = 400,
  increament = 4,
  unit = "px"
) => {
  const classList = {};

  for (let i = start; i <= end; i += increament) {
    classList[`.w-${i}`] = {
      width: `${i}${unit} !important`,
    };
    classList[`.min-w-${i}`] = {
      minWidth: `${i}${unit} !important`,
    };
    classList[`.max-w-${i}`] = {
      maxWidth: `${i}${unit} !important`,
    };
    classList[`.h-${i}`] = {
      height: `${i}${unit} !important`,
    };
    classList[`.min-h-${i}`] = {
      minHeight: `${i}${unit} !important`,
    };
    classList[`.max-h-${i}`] = {
      maxHeight: `${i}${unit} !important`,
    };
  }

  return classList;
};

const generateShadows = (theme) => {
  const classList = {};

  theme.shadows.map((shadow, ind) => {
    classList[`.elevation-z${ind}`] = {
      boxShadow: `${shadow} !important`,
    };
  });

  return classList;
};
