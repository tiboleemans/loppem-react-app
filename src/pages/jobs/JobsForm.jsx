import React, {useEffect, useState} from "react";
import {Card} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomTextField from "../inscription-form/custom/CustomTextField";
import CustomDatePicker from "../inscription-form/custom/CustomDatePicker";
import {Form} from "../inscription-form/useForm";
import {useTranslation} from "react-i18next";
import {initComponentErrors, initErrors, initValues} from "./initJobs";
import {handleComponentError, handleError, handleInputChange, hasNoErrors, hasValues} from "../common/utils";
import CustomTextArea from "../inscription-form/custom/CustomTextArea";
import CustomCheckbox from "../inscription-form/custom/CustomCheckbox";
import CustomButtonGroupMultipleSelect from "../inscription-form/custom/CustomButtonGroupMultipleSelect";
import "./jobs.css";
import {getLanguage} from "../../i18n/i18nSetup";
import {jobsApply} from "../../services/JobsService";
import ApplyConfirmation from "./ApplyConfirmation";

const JobsForm = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [componentErrors, setComponentErrors] = useState(initComponentErrors);

  const languageItems = [
    {id: 'dutch', title: t("jobs.volunteer.label.dutch")},
    {id: 'english', title: t("jobs.volunteer.label.english")},
  ]

  const periodItems = [
    {id: 'july', title: t("jobs.volunteer.label.july")},
    {id: 'august', title: t("jobs.volunteer.label.august")},
  ]

  const functionItems = [
    {id: 'animator', title: t("jobs.volunteer.label.animator")},
    {id: 'teacher', title: t("jobs.volunteer.label.teacher")},
    {id: 'nurse', title: t("jobs.volunteer.label.nurse")},
  ]

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
      values.volunteer.languageString = Array.from(values.volunteer.language).join(",")
      values.volunteer.functionString = Array.from(values.volunteer.function).join(",")
      values.volunteer.periodString = Array.from(values.volunteer.period).join(",")
      values.volunteer.birthdate = values.volunteer.birthdate.toLocaleDateString('nl-BE');
      jobsApply(values).then(result => {
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
    errors.volunteer.language = values.volunteer.language.size ? null : t("jobs.volunteer.error.language");
    errors.volunteer.period = values.volunteer.period.size ? null : t("jobs.volunteer.error.period");
    errors.volunteer.function = values.volunteer.function.size ? null : t("jobs.volunteer.error.function");
    errors.volunteer.birthdate = values.volunteer.birthdate ? null : t("jobs.volunteer.error.birthdate");
    errors.volunteer.gsm = values.volunteer.gsm ? null : t("jobs.volunteer.error.gsm");
    errors.volunteer.motivation = values.volunteer.motivation ? null : t("jobs.volunteer.error.motivation");
    errors.volunteer.experience = values.volunteer.experience ? null : t("jobs.volunteer.error.experience");
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
          <h1>{t("jobs.title")}</h1>
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
                    <CustomButtonGroupMultipleSelect
                      subject="volunteer"
                      name="language"
                      label={t("jobs.volunteer.label.language")}
                      value={values.volunteer.language}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      items={languageItems}
                      error={errors.volunteer.language}
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
                    <CustomButtonGroupMultipleSelect
                      subject="volunteer"
                      name="period"
                      label={t("jobs.volunteer.label.period")}
                      value={values.volunteer.period}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      items={periodItems}
                      error={errors.volunteer.period}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDatePicker
                      subject="volunteer"
                      name="birthdate"
                      label={t("jobs.volunteer.label.birthdate")}
                      value={values.volunteer.birthdate}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      minDate={new Date((new Date().getFullYear() - 99) + "-01-01")}
                      maxDate={new Date((new Date().getFullYear() - 18) + "-12-31")}
                      onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
                      error={errors.volunteer.birthdate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomButtonGroupMultipleSelect
                      subject="volunteer"
                      name="function"
                      label={t("jobs.volunteer.label.function")}
                      value={values.volunteer.function}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      items={functionItems}
                      error={errors.volunteer.function}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      subject="volunteer"
                      label={t("inscription.parent.label.email")}
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
                      label={t("inscription.parent.label.gsm")}
                      name="gsm"
                      type="phone"
                      value={values.volunteer.gsm}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.gsm}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextArea
                      subject="volunteer"
                      label={t("jobs.volunteer.label.motivation")}
                      name="motivation"
                      value={values.volunteer.motivation}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.motivation}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextArea
                      subject="volunteer"
                      label={t("jobs.volunteer.label.experience")}
                      name="experience"
                      value={values.volunteer.experience}
                      onChange={(e) => handleInputChange(e, setValues, values)}
                      error={errors.volunteer.experience}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomCheckbox
                      subject="volunteer"
                      name="recurring"
                      label={t("jobs.volunteer.label.recurring")}
                      value={values.volunteer.recurring}
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

export default JobsForm;
