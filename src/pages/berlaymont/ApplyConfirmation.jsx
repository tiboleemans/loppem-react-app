import {Trans, useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";
import React from "react";
import {CircularProgress} from "@mui/material";
import "./berlaymont.css";

const ApplyConfirmation = (props) => {
  const {t} = useTranslation();

  function ErrorResult() {
    return <>
      <Grid container>
        <div className="inscription-confirmation-error">
          <Grid item sm={8} xs={12}>
            <div className="card inscription-confirmation-card">
              <div className="inscription-confirmation-card-header">
                {t("inscription.confirmation.error.title")}
              </div>
              <div className="jobs-confirmation-card-content">
                <h3>{props.error.message}</h3>
                <p>{props.error.details}</p>
                <p>{t("inscription.confirmation.error.footer")}</p>
                <pre>{props.error.values}</pre>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
      <div className="inscription-confirmation-button" onClick={props.retry}>
        {t("inscription.confirmation.error.retry")}
      </div>
    </>
  }

  function SuccessfulRegistration() {
    return <>
      <div className="card berlaymont-confirmation-card">
        <div className="berlaymont-confirmation-card-header">
          {t("berlaymont.confirmation.success.header")}
        </div>
        <div className="berlaymont-confirmation-card-content">
          <Trans i18nKey="berlaymont.confirmation.success.content" />
        </div>
      </div>
      <div className="inscription-confirmation-button" onClick={props.retry}>
        {t("berlaymont.form.dialog.action.another")}
      </div>
    </>;
  }

  function Registering() {
    return <>
      <Grid container>
        <div className="berlaymont-confirmation-loading">
          <p>{t("berlaymont.confirmation.loading")}</p>
          <CircularProgress size={100}/>
        </div>
      </Grid>
    </>
  }

  return (
    <>
      {props.isLoading === true && <Registering/>}
      {props.isLoading === false && props.error && <ErrorResult/>}
      {props.isLoading === false && props.registration && <SuccessfulRegistration/>}
    </>
  );
}

export default ApplyConfirmation;