import {Trans, useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";
import React from "react";
import {CircularProgress} from "@mui/material";

const InscriptionConfirmation = (props) => {
  const {t} = useTranslation();

  function ErrorResult() {
    return <>
      <Grid container xs={12}>
        <div className="inscription-confirmation-error">
          <Grid item xs={6}>
            <div className="card inscription-confirmation-card">
              <div className="inscription-confirmation-card-header">
                {t("inscription.confirmation.error.title")}
              </div>
              <div className="inscription-confirmation-card-content">
                <pre>{props.error.message}</pre>
                <pre>{props.error.details}</pre>
                <pre>{props.error.values}</pre>
                <p>{t("inscription.confirmation.error.footer")}</p>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
      <div className="inscription-confirmation-button" onClick={props.onClick}>
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
              <Trans i18nKey="inscription.confirmation.card.payment.content"/>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="inscription-confirmation-button" onClick={props.onClick}>
        {t("inscription.confirmation.button")}
      </div>
    </>;
  }

  return (
    <>
      {props.isLoading === true && <CircularProgress/>}
      {props.isLoading === false && props.error && <ErrorResult/>}
      {props.isLoading === false && props.registration && <SuccessfulRegistration/>}
    </>
  );
}

export default InscriptionConfirmation;