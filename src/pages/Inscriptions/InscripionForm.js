import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StudentInformationForm from "./StudentInformationForm";
import ParentInformationForm from "./ParentInformationForm";
import SchoolInformationForm from "./SchoolInformationForm";
import ExtraInformationForm from "./ExtraInformationForm";
import {customStyling} from "../../components/controls/CustomStyling";
import useForm from "../../components/useForm";

const steps = ['Gegevens leerling', 'Gegevens ouder', 'Gegevens school', 'Extra informatie'];

const initialFieldValues = {
    // StudentInformation
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

    // ParentInformation
    firstNameParent: '',
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

    const [step, setStep] = React.useState(0);

    const {values, handleInputChange} = useForm(initialFieldValues);


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <StudentInformationForm values={values} handleInputChange={handleInputChange}/>;
            case 1:
                return <ParentInformationForm values={values} handleInputChange={handleInputChange}/>;
            case 2:
                return <SchoolInformationForm values={values} handleInputChange={handleInputChange}/>;
            case 3:
                return <ExtraInformationForm values={values} handleInputChange={handleInputChange}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setStep(step + 1);
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
                                {getStepContent(step)}
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
