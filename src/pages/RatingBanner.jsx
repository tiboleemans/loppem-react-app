import React from "react";
import {Button, Grid, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffffff',
  },
});

const RatingBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="rating-banner" id="cta1">
      <div className="container">
        <Grid container>
          <Grid item sm={12} className="banner-google">
            <h2>{t("banner.rating.text")}</h2>
          </Grid>
          <Grid container className="banner-google-stars">
            <Grid item sm={3}/>
            <Grid item sm={2}>
              <Button size="large" color="secondary" variant="contained">
                See reviews
              </Button>
            </Grid>
            <Grid item sm={2}>
              <StyledRating name="size-large" defaultValue={5} size="large" readOnly
                            icon={<StarIcon fontSize="inherit"/>}/>
            </Grid>
            <Grid item className="text-center" sm={2}>
              <Button size="large" color="secondary" variant="contained">
                Write a review
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
    ;
};

export default RatingBanner;
