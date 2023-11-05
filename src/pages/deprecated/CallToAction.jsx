import React from "react";
import {Button, Grid} from "@mui/material";
import clsx from "clsx";


const CallToAction = () => {
    return (
        <div className={clsx("section text-white pt-15 bg-orange")} id="cta1">
            <div className="container">
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <h2>Dont miss the best management tool of the world</h2>
                        <p className="text-inherit">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure nam,
                            illum et quis officiis beatae.
                        </p>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className="text-center">
                        <Button size="large" color="secondary" variant="contained">
                            Download de brochure
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default CallToAction;
