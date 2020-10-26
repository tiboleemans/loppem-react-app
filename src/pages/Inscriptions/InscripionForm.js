import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StudentInformationForm, {getErrorStudentStep} from "./StudentInformationForm";
import ParentInformationForm, {getErrorParentStep} from "./ParentInformationForm";
import SchoolInformationForm, {getErrorSchoolStep} from "./SchoolInformationForm";
import ExtraInformationForm, {getErrorExtraInfoStep} from "./ExtraInformationForm";
import {customStyling} from "../../components/controls/CustomStyling";
import useForm from "../../components/useForm";

const steps = ['Gegevens leerling', 'Gegevens ouder', 'Gegevens school', 'Extra informatie'];
const disableValidation = false;

const initialFieldValues = {
    // StudentInformation
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

    // ParentInformation
    firstNameParent: 'test',
    lastNameParent: '',
    email: '',
    relation: '',
    street: '',
    houseNr: '',
    busNr: '',

    city: '',
    zipCode: '',
    gsm: '',
    gsm2: '',

    // SchoolInformation
    nameSchool: '',
    streetSchool: '',
    houseNrSchool: '',
    busNrSchool: '',
    citySchool: '',
    zipSchool: '',
    titleProfSchool: '',
    nameProfSchool: '',
    yearsSchool: '',
    hoursSchool: '',
    immersionSchool: '',
    reportSchool: '',

    // ExtraInformation
    apportedStudent: '',
    contact: '',
    additionalInfo: '',
    foodInfo: '',
    interest: '',
    acceptPictures: false,
    acceptTerms: false
}


export default function InscriptionForm() {
    const classes = customStyling();
    const [step, setStep] = useState(0);

    const {values, handleInputChange} = useForm(initialFieldValues);
    const [errors, setErrors] = useState({});

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
                return disableValidation ||  validateStep(getErrorStudentStep(values));
            case 1:
                return disableValidation ||  validateStep(getErrorParentStep(values));
            case 2:
                return disableValidation || validateStep(getErrorSchoolStep(values));
            case 3:
                return validateStep(getErrorExtraInfoStep(values));
            default:
                throw new Error('Unknown step');
        }
    }

    const validateStep = (errors) => {

        setErrors({
            ...errors
        })

        return Object.values(errors).every(error => error === "");

    }

    const handleNext = () => {
        if(validate()) {
            setStep(step + 1);
        } else {
            window.alert("test")
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (

        <React.Fragment>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Inschrijvingsformulier
                    </Typography>
                    <Stepper activeStep={step} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {step === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent()}
                                <div className={classes.buttons}>
                                    {step !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Vorige
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {step === steps.length - 1 ? 'Inschrijven' : 'Volgende'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
