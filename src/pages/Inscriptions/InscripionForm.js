import React, {useEffect, useState} from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StudentInformationForm, {getErrorStudentStep} from "./StudentInformationForm";
import ParentInformationForm, {getErrorParentStep} from "./ParentInformationForm";
import SchoolInformationForm, {getErrorSchoolStep} from "./SchoolInformationForm";
import ExtraInformationForm, {getErrorExtraInfoStep} from "./ExtraInformationForm";
import useForm from "../../components/useForm";
import Alert from '@mui/material/Alert';
import {registerStudent, updateStudent} from "../../services/InscriptionService";
import {getLanguage} from "../../i18n/i18nSetup";
import {CircularProgress} from "@mui/material";
import {initialFieldValues} from "./initialFieldValues";
import MyStyledPaper from "../../components/controls/MyStyledPaper";
import MyStyledStepper from "../../components/controls/MyStyledStepper";
import {MyStyledButton, MyStyledButtons} from "../../components/controls/MyStyledButton";

const steps = ['Gegevens leerling', 'Gegevens ouder', 'Gegevens school', 'Extra informatie'];
const disableValidation = true;

export default function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const {
    values,
    handleInputChange
  } = useForm(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hasFeedback) {
      switch (step) {
        case 0:
          const errorStudentStep = getErrorStudentStep(values);
          setErrors(errorStudentStep);
          if (validateStep(errorStudentStep)) {
            setHasFeedback(false);
          }
          break;
        case 1:
          const errorParentStep = getErrorParentStep(values);
          setErrors(errorParentStep);
          if (validateStep(errorParentStep)) {
            setHasFeedback(false);
          }
          break;
        case 2:
          const errorSchoolStep = getErrorSchoolStep(values);
          setErrors(errorSchoolStep);
          if (validateStep(errorSchoolStep)) {
            setHasFeedback(false);
          }
          break;
        case 3:
          const errorExtraStep = getErrorExtraInfoStep(values);
          setErrors(errorExtraStep);
          if (validateStep(errorExtraStep)) {
            setHasFeedback(false);
          }
          break;
        default:
          throw new Error('Unknown step');
      }

    }
  }, [values]);

  function getStepContent() {
    switch (step) {
      case 0:
        return <StudentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
      case 1:
        return <ParentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
      case 2:
        return <SchoolInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
      case 3:
        return <ExtraInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const validate = () => {
    switch (step) {
      case 0:
        return disableValidation || validateStep(getErrorStudentStep(values));
      case 1:
        return disableValidation || validateStep(getErrorParentStep(values));
      case 2:
        return disableValidation || validateStep(getErrorSchoolStep(values));
      case 3:
        return disableValidation || validateStep(getErrorExtraInfoStep(values));
      default:
        throw new Error('Unknown step');
    }
  }

  const validateStep = (errors) => {

    setErrors({
      ...errors
    })

    return Object.values(errors).every((error) => error === "");

  }

  const handleNext = () => {
    if (validate()) {
      setHasFeedback(false);
      setStep(step + 1);
      if (step === steps.length - 1) {
        sentInfo()
      }
    } else {
      const generalError = <Alert severity="warning">Niet alle verplichte velden werden ingevuld.</Alert>
      setFeedbackMessage(generalError)
      setHasFeedback(true);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const sentInfo = () => {
    setIsLoading(true);
    values.parent.siteLanguage = getLanguage();
    if (!values.id) {
      const register = registerStudent(values);
      values.id = register.id;
    } else {
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
        {hasFeedback ? feedbackMessage : null}
      </React.Fragment>;
    }
  }

  return (

    <React.Fragment>
      <div className="section bg-light-gray" id="inscription">
        <div className="container">
          <MyStyledPaper>
            <div className="section__header">
              <h2>Inschrijvingsformulier</h2>
            </div>
            <MyStyledStepper activeStep={step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </MyStyledStepper>
            <React.Fragment>
              {step === steps.length ? getInscriptionConfirmation() : (
                <React.Fragment>
                  {getStepContent()}
                  {hasFeedback ? feedbackMessage : null}
                  <MyStyledButtons>
                    {step > 1 && (
                      <MyStyledButton onClick={sentInfo}>
                        Voorlopig opslaan
                      </MyStyledButton>
                    )}
                    {step !== 0 && (
                      <MyStyledButton onClick={handleBack}>
                        Vorige
                      </MyStyledButton>
                    )}
                    <MyStyledButton
                      variant="contained"
                      onClick={handleNext}
                    >
                      {step === steps.length - 1 ? 'Inschrijven' : 'Volgende'}
                    </MyStyledButton>

                  </MyStyledButtons>
                </React.Fragment>
              )}
            </React.Fragment>
          </MyStyledPaper>
        </div>
      </div>
    </React.Fragment>
  );
}
