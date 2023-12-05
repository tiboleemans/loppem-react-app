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
          <Grid container spacing={2} className="banner-action">
            <Grid item xs={1} sm={2}/>
            <Grid item xs={5} sm={3}>
              <BringAFriendConditionsDialog/>
            </Grid>
            <Grid item xs={0} sm={2}>
            </Grid>
            <Grid item xs={5} sm={3}>
              <BringAFriendForm/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default BringAFriend;
