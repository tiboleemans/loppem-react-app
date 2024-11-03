import React, {useEffect, useState} from "react";
import {Card} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomTextField from "../inscription-form/custom/CustomTextField";
import CustomDatePicker from "../inscription-form/custom/CustomDatePicker";
import {Form} from "../inscription-form/useForm";
import {Trans, useTranslation} from "react-i18next";
import {initComponentErrors, initErrors, initValues} from "./initAttestations";
import {handleComponentError, handleError, handleInputChange, hasNoErrors, hasValues} from "../common/utils";
import CustomCheckbox from "../inscription-form/custom/CustomCheckbox";
import "./attestations.css";
import {getLanguage} from "../../i18n/i18nSetup";
import {addAttestation} from "../../services/AttestationsService";
import AddConfirmation from "./AddConfirmation";
import CustomButtonGroup from "../inscription-form/custom/CustomButtonGroup";

const AttestationsForm = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [componentErrors, setComponentErrors] = useState(initComponentErrors);

  const periodItems = [
    {id: 'july', title: t("attestation.student.label.july")},
    {id: 'august', title: t("attestation.student.label.august")},
  ]

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    updateErrors();
  }, [values, showValidation]);

  const handleRetry = () => {
    setShowValidation(true);
    setAxiosResult(undefined);
    setAxiosError(undefined);
    handleSend();
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      values.parent.siteLang = getLanguage();
      const tmpBirthdate = values.student.birthdateAttestation;
      values.student.birthdateAttestation = values.student.birthdateAttestation.toLocaleDateString('nl-BE');
      addAttestation(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        values.student.birthdateAttestation = tmpBirthdate
        setIsLoading(false);
      })
    }
  };

  const handleAnother = () => {
    setShowValidation(false);
    values.student.firstName = '';
    values.student.lastName = '';
    values.student.ssin = '';
    values.student.birthdateAttestation = '';
    setErrors(initErrors);
    setComponentErrors(initComponentErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  function updateErrors() {
    errors.parent.firstName = values.parent.firstName ? null : t("attestation.parent.error.firstName")
    errors.parent.lastName = values.parent.lastName ? null : t("attestation.parent.error.lastName")
    errors.parent.ssin = values.parent.ssin ? null : t("attestation.parent.error.ssin")
    errors.parent.street = values.parent.street ? null : t("attestation.parent.error.street")
    errors.parent.houseNr = values.parent.houseNr ? null : t("attestation.parent.error.houseNr")
    errors.parent.city = values.parent.city ? null : t("attestation.parent.error.city")
    errors.parent.zipCode = values.parent.zipCode ? null : t("attestation.parent.error.zipCode")
    errors.student.firstName = values.student.firstName ? null : t("attestation.student.error.firstName")
    errors.student.lastName = values.student.lastName ? null : t("attestation.student.error.lastName")
    errors.student.ssin = values.student.ssin ? null : t("attestation.student.error.ssin")
    errors.student.period = values.student.period ? null : t("attestation.student.error.period")
    errors.student.birthdateAttestation = values.student.birthdateAttestation ? null : t("attestation.student.error.birthdate")
    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasValues(values.parent) && hasNoErrors(errors.parent) && hasNoErrors(componentErrors.parent) &&
      hasValues(values.student) && hasNoErrors(errors.student) && hasNoErrors(componentErrors.student);
  }

  function showConfirmation() {
    return isLoading || axiosResult || axiosError;
  }

  return (
    <div className="section" id="attestation">
      <div className="container">
        <Card className="card-container">
          <h1>{t("attestation.title")}</h1>
          <Trans i18nKey="attestation.description"/>
          {showConfirmation() ? (
            <>
              <AddConfirmation isLoading={isLoading} registration={axiosResult} error={axiosError} retry={handleRetry} another={handleAnother}/>
            </>
          ) : (
            <>
              <Form>
                <h3 className="attestation-form-title">{t("attestation.parent.title")}</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="parent"
                      label={t("attestation.parent.label.firstName")}
                      name="firstName"
                      value={values.parent.firstName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="parent"
                      label={t("attestation.parent.label.lastName")}
                      name="lastName"
                      value={values.parent.lastName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="parent"
                      label={t("attestation.parent.label.ssin")}
                      name="ssin"
                      value={values.parent.ssin}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.ssin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}/>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject={"parent"}
                      label={t("attestation.parent.label.street")}
                      name="street"
                      value={values.parent.street}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.street}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <CustomTextField
                      subject={"parent"}
                      label={t("attestation.parent.label.houseNr")}
                      name="houseNr"
                      value={values.parent.houseNr}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.houseNr}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <CustomTextField
                      subject={"parent"}
                      label={t("attestation.parent.label.busNr")}
                      name="busNr"
                      value={values.parent.busNr}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject={"parent"}
                      label={t("attestation.parent.label.city")}
                      name="city"
                      value={values.parent.city}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.city}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject={"parent"}
                      label={t("attestation.parent.label.zip")}
                      name="zipCode"
                      value={values.parent.zipCode}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.parent.zipCode}
                    />
                  </Grid>
                </Grid>
                <h3 className="attestation-form-title">{t("attestation.student.title")}</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject={"student"}
                      label={t("attestation.student.label.firstName")}
                      name="firstName"
                      value={values.student.firstName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.student.firstName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject={"student"}
                      label={t("attestation.student.label.lastName")}
                      name="lastName"
                      value={values.student.lastName}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.student.lastName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomDatePicker
                      subject={"student"}
                      name="birthdateAttestation"
                      label={t("attestation.student.label.birthdate")}
                      value={values.student.birthdateAttestation}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      minDate={new Date("2009-07-08")}
                      maxDate={new Date((new Date().getFullYear() - 9) + "-12-31")}
                      error={errors.student.birthdateAttestation}
                      onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                      subject={"student"}
                      name="period"
                      label={t("attestation.student.label.period")}
                      value={values.student.period}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      items={periodItems}
                      error={errors.student.period}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="student"
                      label={t("attestation.student.label.ssin")}
                      name="ssin"
                      value={values.student.ssin}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.student.ssin}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomCheckbox
                      subject="student"
                      name="hasOtherAddress"
                      label={t("attestation.student.label.hasOtherAddress")}
                      value={values.student.hasOtherAddress}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                    />
                  </Grid>

                  {values.student.hasOtherAddress ?
                    (
                      <>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            subject={"student"}
                            label={t("attestation.parent.label.street")}
                            name="street"
                            value={values.student.street}
                            onChange={(e) => handleInputChange(e, setValues, values)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <CustomTextField
                            subject={"student"}
                            label={t("attestation.parent.label.houseNr")}
                            name="houseNr"
                            value={values.student.houseNr}
                            onChange={(e) => handleInputChange(e, setValues, values)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <CustomTextField
                            subject={"student"}
                            label={t("attestation.parent.label.busNr")}
                            name="busNr"
                            value={values.student.busNr}
                            onChange={(e) => handleInputChange(e, setValues, values)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            subject={"student"}
                            label={t("attestation.parent.label.city")}
                            name="city"
                            value={values.student.city}
                            onChange={(e) => handleInputChange(e, setValues, values)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            subject={"student"}
                            label={t("attestation.parent.label.zip")}
                            name="zipCode"
                            value={values.student.zipCode}
                            onChange={(e) => handleInputChange(e, setValues, values)}
                          />
                        </Grid>
                      </>
                    ) : (<></>)}

                </Grid>
              </Form>

              <div className="flex-container">
                <div className="attestation-button" onClick={handleSend}>
                  {t("attestation.button.send")}
                </div>
              </div>
            </>
          )}
        < /Card>
      </div>
    </div>
  );
};

export default AttestationsForm;
