import React from "react";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import BringAFriendConditionsDialog from "./BringAFriendConditionsDialog";
import BringAFriendForm from "./BringAFriendForm";
import "./banner.css"

const BringAFriend = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="rating-banner">
      <div className="container">
        <Grid container>
          <Grid item sm={12} className="banner-text">
            <h2>{t("banner.bringafriend.title")}</h2>
          </Grid>
          <Grid container className="banner-action">
            <Grid item sm={2}/>
            <Grid item sm={3}>
              <BringAFriendConditionsDialog/>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={3}>
              <BringAFriendForm/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default BringAFriend;
