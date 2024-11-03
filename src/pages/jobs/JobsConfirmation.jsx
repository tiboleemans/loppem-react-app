import React, {useEffect, useState} from "react";
import {Card} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomTextField from "../inscription-form/custom/CustomTextField";
import {Form} from "../inscription-form/useForm";
import {useTranslation} from "react-i18next";
import {initComponentErrors, initErrors, initValues} from "./initConfirmationJobs";
import {handleComponentError, handleError, handleInputChange, hasNoErrors, hasValues} from "../common/utils";
import CustomTextArea from "../inscription-form/custom/CustomTextArea";
import "./jobs.css";
import {getLanguage} from "../../i18n/i18nSetup";
import ApplyConfirmation from "./ApplyConfirmation";
import {jobsConfirmation} from "../../services/JobsService";

const JobsConfirmation = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [componentErrors, setComponentErrors] = useState(initComponentErrors);

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    updateErrors();
  }, [values, showValidation]);

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      values.volunteer.siteLang = getLanguage();
      jobsConfirmation(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  function updateErrors() {
    errors.volunteer.firstName = values.volunteer.firstName ? null : t("jobs.volunteer.error.firstName");
    errors.volunteer.lastName = values.volunteer.lastName ? null : t("jobs.volunteer.error.lastName");
    errors.volunteer.email = values.volunteer.email ? null : t("jobs.volunteer.error.email");
    errors.volunteer.gsm = values.volunteer.gsm ? null : t("jobs.volunteer.error.gsm");
    errors.volunteer.ssin = values.volunteer.ssin ? null : t("jobs.volunteer.error.ssin");
    errors.volunteer.account = values.volunteer.account ? null : t("jobs.volunteer.error.account");
    errors.volunteer.street = values.volunteer.street ? null : t("jobs.volunteer.error.street");
    errors.volunteer.municipality = values.volunteer.municipality ? null : t("jobs.volunteer.error.municipality");
    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasValues(values.volunteer) && hasNoErrors(errors.volunteer) && hasNoErrors(componentErrors.volunteer);
  }

  function showConfirmation() {
    return isLoading || axiosResult || axiosError;
  }

  return (
    <div className="section" id="jobs">
      <div className="container">
        <Card className="card-container">
          <h1>{t("jobs.confirmation.title")}</h1>
          {showConfirmation() ? (
            <>
              <ApplyConfirmation isLoading={isLoading} registration={axiosResult} error={axiosError} retry={handleSend}/>
            </>
          ) : (
            <>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.firstName")}
                      name="firstName"
                      value={values.volunteer.firstName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.lastName")}
                      name="lastName"
                      value={values.volunteer.lastName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.email")}
                      name="email"
                      type="email"
                      showValidation={showValidation}
                      value={values.volunteer.email}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
                      error={errors.volunteer.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.gsm")}
                      name="gsm"
                      type="phone"
                      value={values.volunteer.gsm}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.gsm}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.ssin")}
                      name="ssin"
                      value={values.volunteer.ssin}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.ssin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.account")}
                      name="account"
                      value={values.volunteer.account}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.account}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.street")}
                      name="street"
                      value={values.volunteer.street}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.street}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("jobs.volunteer.label.municipality")}
                      name="municipality"
                      value={values.volunteer.municipality}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.municipality}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextArea
                      subject="volunteer"
                      label={t("jobs.volunteer.label.kitchen")}
                      name="kitchen"
                      value={values.volunteer.kitchen}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextArea
                      subject="volunteer"
                      label={t("jobs.volunteer.label.extra_information")}
                      name="extra_information"
                      value={values.volunteer.extra_information}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                    />
                  </Grid>
                </Grid>
              </Form>

              <div className="flex-container">
                <div className="jobs-button" onClick={handleSend}>
                  {t("jobs.button.send")}
                </div>
              </div>
            </>
          )}
        < /Card>
      </div>
    </div>
  );
};

export default JobsConfirmation;
