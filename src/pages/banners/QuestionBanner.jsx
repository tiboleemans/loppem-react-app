import React from "react";
import {Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

const QuestionBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="rating-banner">
      <div className="container">
        <Grid container>
          <Grid item sm={8} className="banner-text">
            <h2>Heeft u een vraag of een probleem?</h2>
          </Grid>
          <Grid item sm={2}>
            <Button size="large" color="secondary" variant="contained">
              Contacteer ons
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default QuestionBanner;
