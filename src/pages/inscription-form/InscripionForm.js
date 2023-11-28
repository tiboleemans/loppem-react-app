import React, {useEffect, useState} from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StudentInformationForm from "./steps/StudentInformationForm";
import ParentInformationForm from "./steps/ParentInformationForm";
import SchoolInformationForm from "./steps/SchoolInformationForm";
import ExtraInformationForm from "./steps/ExtraInformationForm";
import useForm from "./useForm";
import Alert from '@mui/material/Alert';
import {Card} from "@mui/material";
import CustomStepper from "./custom/CustomStepper";
import "./inscription-form.css";
import {useTranslation} from "react-i18next";
import InscriptionConfirmation from "./steps/InscriptionConfirmation";
import {registerStudent} from "../../services/InscriptionService";
import axios from "axios";

const disableValidation = false;

export default function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [myStepHasErrors, setMyStepHasErrors] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(undefined);
  const [registrationError, setRegistrationError] = useState(undefined);
  const {t} = useTranslation();
  const {
    values,
    handleInputChange,
    errors,
    handleOnError,
    componentErrors,
    updateMyStepErrors
  } = useForm(showValidation, step);
  const steps = [t("inscription.steps.student"), t("inscription.steps.parent"), t("inscription.steps.school"), t("inscription.steps.extra")];

  function stepHasNoErrors(stepErrors, componentErrors) {
    return Object.values(stepErrors).every((error) => error === null) && Object.values(componentErrors).every((componentError) => componentError === null);
  }

  function stepHasNoValues(stepValues) {
    return Object.values(stepValues).every((value) => value === '' || value === null || value === false);
  }

  function handleError(error) {
    if (axios.isAxiosError(error)) {
      const axiosError = {
        message: error.toJSON().message,
        details: JSON.stringify(error.response.data.error.details),
        values: error.toJSON().config.data,
      }
      setRegistrationError(axiosError);
    } else {
      const validationError = {
        message: t("confirmation.error.undefined"),
        details: JSON.stringify(error),
        values: values,
      }
      setRegistrationError(validationError);
    }
  }


  useEffect(() => {
    setRegistrationResult(undefined);
    setRegistrationError(undefined);
    if (step === steps.length) {
      setIsLoading(true);
      registerStudent(values).then(inscription => {
        setRegistrationResult(inscription);
      }).catch(error => {
        handleError(error);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }, [step]);

  useEffect(() => {
    setMyStepHasErrors(!myStepHasNoErrors())
  }, [errors, values])

  function myStepHasNoErrors() {
    switch (step) {
      case 0:
        return stepHasNoErrors(errors.student, componentErrors.student);
      case 1:
        return stepHasNoErrors(errors.parent, componentErrors.parent);
      case 2:
        return stepHasNoErrors(errors.school, componentErrors.school);
      case 3:
        return stepHasNoErrors(errors.extra, componentErrors.extra);
      default:
        return false;
    }
  }

  function myStepHasNoValues() {
    switch (step) {
      case 0:
        return stepHasNoValues(values.student);
      case 1:
        return stepHasNoValues(values.parent);
      case 2:
        return stepHasNoValues(values.school);
      case 3:
        return stepHasNoValues(values.extra);
      default:
        return false;
    }
  }

  const handleNext = () => {
    updateMyStepErrors();
    setShowValidation(true);
    if (myStepHasNoValues()) {
      return;
    }
    if (myStepHasNoErrors()) {
      setStep(step + 1);
      setShowValidation(false);
    }
  };

  const handleBack = () => {
    setShowValidation(true);
    setStep(step - 1);
  };

  const handleAnotherRegistration = () => {
    setStep(0);
    setShowValidation(true);
  }

  return (
    <div className="section" id="inscription">
      <div className="container">
        <Card className="card-container">
          <h1>{t("inscription.title")}</h1>
          <CustomStepper activeStep={step}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </CustomStepper>
          <>
            {step === steps.length ? (
              <>
                <InscriptionConfirmation isLoading={isLoading} registration={registrationResult} error={registrationError}
                                         onClick={handleAnotherRegistration}/>
              </>
            ) : (
              <>
                {step === 0 &&
                <StudentInformationForm values={values} handleInputChange={handleInputChange} handleOnError={handleOnError} errors={errors}/>}
                {step === 1 && <ParentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                {step === 2 && <SchoolInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                {step === 3 && <ExtraInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                {showValidation && myStepHasErrors ? <Alert severity="warning">{t("inscription.form.errors")}</Alert> : null}
                <div className="inscription-button-container">
                  {step !== 0 && (
                    <div className="inscription-button" onClick={handleBack}>
                      {t("inscription.button.back")}
                    </div>
                  )}
                  <div className="inscription-button" onClick={handleNext}>
                    {step === steps.length - 1 ? t("inscription.button.enroll") : t("inscription.button.next")}
                  </div>
                </div>
              </>
            )}
          </>
        </Card>
      </div>
    </div>
  );
}
