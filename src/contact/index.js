import React, {useState} from 'react'
import {Axios, db} from '../firebase/firebaseConfig'
import './styled.scss'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from '@bit/nexxtway.react-rainbow.date-picker';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ContactForm = () => {
    const classes = useStyles();

    const [formData, setFormData] = useState({})

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
            <Container>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>cursustaal: </label>
                            <ButtonGroup color="primary" aria-label="primary button group">
                                <Button>Nederlands</Button>
                                <Button>Engels</Button>
                            </ButtonGroup>
                        </div>

                        <div>
                            <label>periode: </label>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button>juli</Button>
                                <Button>augustus</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                    <div>
                        <FormControl>
                            <InputLabel htmlFor="firstName">Voornaam</InputLabel>
                            <Input id="firstName"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="name">Naam</InputLabel>
                            <Input id="name"/>
                        </FormControl>
                    </div>
                    <div>
                        <label>geslacht: </label>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button>Jongen</Button>
                            <Button>Meisje</Button>
                        </ButtonGroup>
                    </div>
                    <div
                        className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large">
                        <DatePicker
                            label="Geboortedatum"/>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email"/>
                        </FormControl>
                    </div>
                    <Button type="submit" color="primary">Submit</Button>
                </form>


                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <label>cursustaal:</label>
                                </Grid>
                                <Grid item xs={3}>
                                    <ButtonGroup color="primary" aria-label="primary button group">
                                        <Button>Nederlands</Button>
                                        <Button>Engels</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>Periode</Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>Voornaam</Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>Naam</Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>Geslacht</Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>Geboortedatum</Paper>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Paper className={classes.paper}>Email</Paper>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Paper className={classes.paper}>checkbox</Paper>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>Ben je akkoord?</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>Inschrijven</Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default ContactForm