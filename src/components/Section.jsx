import React, {useState} from "react";
import {lighten, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({
                                  palette,
                                  ...theme
                              }) => ({
    cardHolder: {
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        "&:hover $cardOverlay": {
            opacity: 1,
        },
    },
    cardOverlay: {
        padding: "0px 1rem",
        transition: "all 250ms ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "absolute",
        borderRadius: 8,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0,
        color: palette.primary.contrastText,
        background: "rgba(0,0,0,0.67)",
        zIndex: 5,
    },
    buttonGroupBG: {
        background: lighten(palette.primary.light, 0.9),
        "&>div": {
            transition: "all 250ms ease",
            "&:hover": {
                background: palette.primary.main,
                color: palette.primary.contrastText,
                borderRadius: 8,
            },
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
                width: "100%",
            },
        },
    },
}));

function Section(props) {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="inline-block mb-10">
            <div
                className={`flex flex-wrap items-center border-radius-8 ${classes.buttonGroupBG}`}
            >
                {props.data.map((item, index) => (
                    <div
                        className="px-6 py-2 cursor-pointer"
                        onClick={() => setTabIndex(index)}
                    >
                        {item.title}
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Section;