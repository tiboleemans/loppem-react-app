import {Trans, useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";
import React from "react";
import {CircularProgress} from "@mui/material";
import "./attestations.css";

const AddConfirmation = (props) => {
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
              <div className="attestation-confirmation-card-content">
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
      <div className="attestation-confirmation-loading">
        <div className="card attestation-confirmation-card">
          <div className="inscription-confirmation-card-header">
            {t("attestation.confirmation.card.mail.header")}
          </div>
          <div className="attestation-confirmation-card-content">
            <Trans i18nKey="attestation.confirmation.card.mail.content"/>
          </div>
        </div>
      </div>
      <div className="inscription-confirmation-button" onClick={props.another}>
        {t("attestation.confirmation.button")}
      </div>
    </>;
  }

  function Registering() {
    return <>
      <Grid container>
        <div className="attestation-confirmation-loading">
          <p>{t("attestation.confirmation.loading")}</p>
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

export default AddConfirmation;