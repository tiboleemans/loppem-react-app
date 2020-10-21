import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import useForm, {Form} from "../../components/useForm";
import CustomInput from "../../components/controls/CustomInput";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


const initialFieldValues = {
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

    acceptTerms: ''
}
const useStyles = makeStyles((theme) => ({
    row: {
        marginBottom: 0.1,
    }
}));

export default function StepOneForm() {
    const classes = useStyles();

    const [language, setLanguage] = useState('');

    const languageItems = [
        {id: 'dutch', title: 'Nederlands'},
        {id: 'english', title: 'Engels'},
    ]

    const periodItems = [
        {id: 'july', title: 'Juli', selected: 'false'},
        {id: 'august', title: 'Augustus', selected: 'true'},
    ]

    const genderItems = [
        {id: 'boy', title: 'Jongen'},
        {id: 'girl', title: 'Meisje'},
    ]

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);

    const toggleContent = e => {
        e.preventDefault();
        console.log(e.target.name);
        setLanguage(e.target.name);
    }


    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens leerling
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        name="language"
                        label="* Cursustaal:"
                        value={values.language}
                        onChange={handleInputChange}
                        items={languageItems}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        name="period"
                        label="* Periode:"
                        value={values.period}
                        onChange={handleInputChange}
                        items={periodItems}/>
                </Grid>

                <Grid item xs={12} sm={6} >
                    <CustomInput
                        label="Voornaam Leerling"
                        name="firstNameStudent"
                        value={values.firstNameStudent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <CustomInput
                        label="Naam Leerling"
                        name="lastNameStudent"
                        value={values.lastNameStudent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomDatePicker
                        name="birthday"
                        label="Geboortedatum"
                        value={values.birthday}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="gender"
                        label="* Geslacht:"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}/>
                </Grid>
            </Grid>

            <Grid xs={12} row>
                <CustomCheckbox
                    name="acceptTerms"
                    label="Ik aanvaard de algemene voorwaarden en privacyregels"
                    value={values.acceptTerms}
                    onChange={handleInputChange}
                />
            </Grid>
        </Form>
    )
}
