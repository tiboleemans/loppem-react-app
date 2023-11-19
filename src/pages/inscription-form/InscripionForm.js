import React, {useEffect, useState} from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StudentInformationForm from "./steps/StudentInformationForm";
import ParentInformationForm from "./steps/ParentInformationForm";
import SchoolInformationForm from "./steps/SchoolInformationForm";
import ExtraInformationForm from "./steps/ExtraInformationForm";
import useForm from "./useForm";
import Alert from '@mui/material/Alert';
import {registerStudent, updateStudent} from "../../services/InscriptionService";
import {getLanguage} from "../../i18n/i18nSetup";
import {Card, CircularProgress} from "@mui/material";
import CustomStepper from "./custom/CustomStepper";
import "./inscription-form.css";

const steps = ['Gegevens leerling', 'Gegevens ouder', 'Gegevens school', 'Extra informatie'];
const disableValidation = false;

export default function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [myStepHasErrors, setMyStepHasErrors] = useState(false);

  const {
    values,
    handleInputChange,
    errors,
    handleOnError,
    componentErrors
  } = useForm(showValidation, step);

  function stepHasNoErrors(stepErrors, componentErrors) {
    return Object.values(stepErrors).every((error) => error === null) && Object.values(componentErrors).every((componentError) => componentError === null);
  }

  useEffect(() => {
    if (isValid && showValidation) {
      setIsValid(false);
      setStep(step + 1);
      setShowValidation(false);
      if (step === steps.length - 1) {
        sentInfo()
      }
    }
  }, [isValid, showValidation])

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

  function validate() {
    if (!errors.initiated) {
      return;
    }
    setIsValid(myStepHasNoErrors());

    // if (step === 0) {
    //   let hasNoErrors = stepHasNoErrors(errors.student, componentErrors.student);
    //   setIsValid(hasNoErrors);
    // } else if (step === 1) {
    //   let hasNoErrors = stepHasNoErrors(errors.parent, componentErrors.parent);
    //   setIsValid(hasNoErrors);
    // } else if (step === 2) {
    //   let hasNoErrors = stepHasNoErrors(errors.school, componentErrors.school);
    //   setIsValid(hasNoErrors);
    // } else if (step === 3) {
    //   let hasNoErrors = stepHasNoErrors(errors.extra, componentErrors.extra);
    //   setIsValid(hasNoErrors);
    // } else {
    //   setIsValid(false);
    // }
  };

  const handleNext = () => {
    setShowValidation(true);
    validate();
  };

  const handleBack = () => {
    setShowValidation(false);
    setIsValid(false);
    setStep(step - 1);
  };

  const sentInfo = () => {
    setIsLoading(true);
    values.parent.siteLanguage = getLanguage();
    if (!values.id) {
      const register = registerStudent(values);
      values.id = register.id;
    } else {
      // TODO update student functionality
      const update = updateStudent(values.id, values);
    }
    setIsLoading(false);
  }

  const getInscriptionConfirmation = () => {
    if (isLoading) {
      return <CircularProgress/>
    } else {
      return <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Bedankt voor uw inschrijving.
        </Typography>
        <Typography variant="subtitle1">
          U ontvangt van ons een bevestigingsmail (gelieve ook uw ongewenste e-mail na te kijken).
          Begin juni contacteren wij u per e-mail met praktische informatie m.b.t. de taalvakantie.
          We verwachten u op de eerste dag van de stage in de abdijschool van Zevenkerken.
          Gelieve het voorschot binnen de drie werkdagen te storten op rekening BE16 0018 5319 2474.
        </Typography>
      </React.Fragment>;
    }
  }

  return (

    <React.Fragment>
      <div className="inscription-card" id="inscription">
        <div className="container">
          <Card className="card-container">
            <h1>Inschrijvingsformulier</h1>
            <CustomStepper activeStep={step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </CustomStepper>
            <React.Fragment>
              {step === steps.length ? getInscriptionConfirmation() : (
                <React.Fragment>
                  {step === 0 &&
                  <StudentInformationForm values={values} handleInputChange={handleInputChange} handleOnError={handleOnError} errors={errors}/>}
                  {step === 1 && <ParentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                  {step === 2 && <SchoolInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                  {step === 3 && <ExtraInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>}
                  {myStepHasErrors ? <Alert severity="warning">Niet alle verplichte velden werden ingevuld.</Alert> : null}
                  <div className="inscription-button-container">
                    {step > 1 && (
                      <div className="inscription-button" onClick={sentInfo}>
                        Voorlopig opslaan
                      </div>
                    )}
                    {step !== 0 && (
                      <div className="inscription-button" onClick={handleBack}>
                        Vorige
                      </div>
                    )}
                    <div className="inscription-button"
                         onClick={handleNext}
                    >
                      {step === steps.length - 1 ? 'Inschrijven' : 'Volgende'}
                    </div>

                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
