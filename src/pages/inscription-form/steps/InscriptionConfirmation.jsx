import {Trans, useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";
import React from "react";
import {CircularProgress} from "@mui/material";

const InscriptionConfirmation = (props) => {
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
              <div className="inscription-confirmation-card-content">
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
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <div className="card inscription-confirmation-card">
            <div className="inscription-confirmation-card-header">
              {t("inscription.confirmation.card.mail.header")}
            </div>
            <div className="inscription-confirmation-card-content">
              <Trans i18nKey="inscription.confirmation.card.mail.content"/>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="card inscription-confirmation-card">
            <div className="inscription-confirmation-card-header">
              {t("inscription.confirmation.card.payment.header")}
            </div>
            <div className="inscription-confirmation-card-content">
              <Trans i18nKey="inscription.confirmation.card.payment.content.normal"/>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="inscription-confirmation-button" onClick={props.anotherRegistration}>
        {t("inscription.confirmation.button")}
      </div>
    </>;
  }

  function Registering() {
    return <>
      <Grid container>
        <div className="inscription-confirmation-loading">
          <p>{t("inscription.confirmation.loading")}</p>
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

export default InscriptionConfirmation;