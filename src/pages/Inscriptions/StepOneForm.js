import React from 'react';
import Grid from "@material-ui/core/Grid";
import useForm, {Form} from "../../components/useForm";
import CustomInput from "../../components/controls/CustomInput";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


const initialFieldValues = {
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

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

    acceptPictures: '',
    acceptTerms: ''
}
const useStyles = makeStyles((theme) => ({
    row: {
        marginBottom: 0.1,
    }
}));

export default function StepOneForm() {
    const classes = useStyles();

    const languageItems = [
        {id: 'dutch', title: 'Nederlands'},
        {id: 'english', title: 'Engels'},
    ]

    const periodItems = [
        {id: 'july', title: 'Juli'},
        {id: 'augusts', title: 'Augustus'},
    ]

    const genderItems = [
        {id: 'boy', title: 'Jongen'},
        {id: 'girl', title: 'Meisje'},
    ]

    const relationItems = [
        {id: 'mother', title: 'Moeder'},
        {id: 'father', title: 'Vader'},
        {id: 'guardian', title: 'Voogd'},
    ]

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);


    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Informatie leerling
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} >
                    <CustomRadioGroup
                        name="language"
                        label="* Cursustaal:"
                        values={values.language}
                        onChange={handleInputChange}
                        items={languageItems}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomRadioGroup
                        name="period"
                        label="* Periode:"
                        value={values.period}
                        onChange={handleInputChange}
                        items={periodItems}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInput
                        label="Voornaam Leerling"
                        name="firstNameStudent"
                        value={values.firstNameStudent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
                    <CustomRadioGroup
                        name="gender"
                        label="* Geslacht:"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Informatie ouder
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CustomInput
                        label="Voornaam ouder"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInput
                        label="Naam ouder"
                        name="lastNameParent"
                        value={values.lastNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid xs={12} row>
                <CustomCheckbox
                    name="acceptPictures"
                    label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                    value={values.acceptPictures}
                    onChange={handleInputChange}
                />
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
