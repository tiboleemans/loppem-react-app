import React, {useState} from 'react'
import {Axios, db} from '../firebase/firebaseConfig'
import './styled.scss'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    label: {
        color: "rgba(213,18,18,0.26)",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        transition: "0.3s ease all",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingLeft: "0"
    }
}));

const ContactForm = () => {

    const classes = useStyles();

    const [formData, setFormData] = useState({})

    const [valueLang, setValueLang] = React.useState('');
    const [errorLang, setErrorLang] = React.useState(false);

    const handleRadioLangChange = (event) => {
        setValueLang(event.target.value);
        setErrorLang(false);
    };

    const [valuePeriod, setValuePeriod] = React.useState('');
    const [errorPeriod, setErrorPeriod] = React.useState(false);

    const handleRadioPeriodeChange = (event) => {
        setValuePeriod(event.target.value);
        setErrorPeriod(false);
    };


    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        sendEmail()
        setFormData({
            name: '',
            email: '',
            message: '',
        })
    }
    const sendEmail = () => {
        Axios.post(
            'https://us-central1-loppem-adf69.cloudfunctions.net/submit',
            formData
        )
            .then(res => {
                db.collection('emails').add({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    time: new Date(),
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
            <Card>
                <CardContent>

                <form onSubmit={handleSubmit}>


                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" error={errorLang} className={classes.formControl}>
                                    <FormLabel component="legend">* Curusustaal:</FormLabel>
                                    <RadioGroup aria-label="language-choice" name="language-choice" value={valueLang}
                                                onChange={handleRadioLangChange}>
                                        <FormControlLabel value="dutch" control={<Radio/>} label="Nederlands"/>
                                        <FormControlLabel value="english" control={<Radio/>} label="Engels"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" error={errorPeriod} className={classes.formControl}>
                                    <FormLabel component="legend">* Periode:</FormLabel>
                                    <RadioGroup aria-label="periode-choice" name="periode-choice" value={valuePeriod}
                                                onChange={handleRadioPeriodeChange}>
                                        <FormControlLabel value="july" control={<Radio/>} label="Juli"/>
                                        <FormControlLabel value="august" control={<Radio/>} label="Augustus"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl>
                                    <InputLabel htmlFor="firstName">Voornaam</InputLabel>
                                    <Input id="firstName"/>
                                </FormControl>
                            </Grid>
                            <FormControl>
                                <InputLabel htmlFor="name">Naam</InputLabel>
                                <Input id="name"/>
                            </FormControl>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" error={errorPeriod} className={classes.formControl}>
                                    <FormLabel component="legend">* Geslacht:</FormLabel>
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button>Jongen</Button>
                                        <Button>Meisje</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={10}>
                                <Paper className={classes.paper}>Ben je akkoord?</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>Inschrijven</Paper>
                            </Grid>
                        </Grid>
                    </div>
                </form>
                </CardContent>
            </Card>
        </>
    )
}

export default ContactForm
