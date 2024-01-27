import React from "react";
import {Grid, Link, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import "./banner.css";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffffff',
  },
});

const RatingBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="cta1">
      <div className="container rating-display-web">
        <Grid container>
          <Grid item xs={12} className="banner-text">
            <h2>{t("banner.rating.text")}</h2>
          </Grid>
          <Grid container className="banner-action">
            <Grid item xs={4} sm={2}/>
            <Grid item xs={4} sm={2}>
              <Link
                href="https://g.co/kgs/GvDXeHN"
                target="_blank">
                <div className="banner-button">
                  {t("banner.rating.button.1")}
                </div>
              </Link>
            </Grid>
            <Grid item xs={2} sm={1}/>
            <Grid item xs={12} sm={2} className="rating-item">
              <StyledRating name="size-large" defaultValue={5} size="large" readOnly
                            icon={<StarIcon fontSize="large"/>}/>
            </Grid>
            <Grid item xs={8} sm={1}/>
            <Grid item xs={12} sm={2}>
              <Link href="https://g.page/r/CeYqh-HAh5F9EAg/review" target="_blank">
                <div className="banner-button">
                  {t("banner.rating.button.2")}
                </div>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className="container rating-display-mobile">
        <Grid container>
          <Grid item xs={12} sm={2} className="rating-item">
            <StyledRating name="size-large" defaultValue={5} size="large" readOnly
                          icon={<StarIcon fontSize="large"/>}/>
          </Grid>
          <Grid item xs={12} className="banner-text">
            <h2>{t("banner.rating.text")}</h2>
          </Grid>
          <Grid container spacing={2} className="banner-action">
            <Grid item xs={1}/>
            <Grid item xs={5} sm={2}>
              <Link
                href="https://www.google.com/search?hl=en-BE&gl=be&q=Loppem+Conversa,+Enseignement,+Zevenkerken+4,+8200+Brugge&ludocid=9048162388851239654&lsig=AB86z5Wu7iJz8vM-JQvu2WBqaMWp&authuser=2&hl=en&gl=BE&sa=X&ved=2ahUKEwjzz4ylma2CAxV00gIHHTSmC7YQ3PALegQIKRAE#lrd=0x47c357361301a8b1:0x7d9187c0e1872ae6,1"
                target="_blank">
                <div className="banner-button">
                  {t("banner.rating.button.1")}
                </div>
              </Link>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={5} sm={2}>
              <Link href="https://g.page/r/CeYqh-HAh5F9EAg/review" target="_blank">
                <div className="banner-button">
                  {t("banner.rating.button.2")}
                </div>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default RatingBanner;
