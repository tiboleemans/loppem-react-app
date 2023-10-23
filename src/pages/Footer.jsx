import React from "react";
import {Grid} from "@mui/material";
import { styled } from "@mui/system";
import clsx from "clsx";

const useStyles = styled(({palette, ...theme}) => ({
    footerSection: {
        "& h4:after": {
            content: '" "',
            position: "absolute",
            bottom: -8,
            left: 0,
            height: 2,
            width: 64,
            background: palette.secondary.main,
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={clsx("bg-light-gray", classes.footerSection)} id="footer">
            <div className="container">
                <Grid container>
                    <Grid item lg={3} md={3} sm={12}>
                        <div className="p-8">
                            <h4 className="text-20 mb-6 relative">Onze gegevens</h4>
                            <div className="px-4 my-8 flex items-center mx--4">
                                <div className="pl-4">
                                    <p className="m-1 p-0 text-inherit">VZW Taalstages CV</p>
                                    <p className="m-1 p-0 text-inherit">0714.900.490</p>
                                    <p className="m-1 p-0 text-inherit">info@loppemconversa.be</p>
                                    <p className="m-1 p-0 text-inherit">0478 51 93 44</p>
                                    <p className="m-1 p-0 text-inherit">BE16 0018 5319 2474</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <div className="p-8">
                            <h4 className="text-20 mb-6 relative">Social media</h4>
                            <p className="text-inherit">
                               Volg ons op:
                            </p>

                            <div className="mt-8">
                                <p className="text-inherit">
                                    LOGO FACEBOOK
                                </p>
                                <p className="text-inherit">
                                    LOGO INSTAGRAM
                                </p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <div className="p-8">
                            <h4 className="text-20 mb-6 relative">Onze partners</h4>
                            <p className="text-inherit">
                                LOGO juvigo
                            </p>
                            <p className="text-inherit">
                                LOGO VGC
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer;
