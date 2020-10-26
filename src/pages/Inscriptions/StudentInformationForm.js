import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Form} from "../../components/useForm";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import Typography from "@material-ui/core/Typography";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


export default function StudentInformationForm(props) {

    const {values, handleInputChange, errors} = props;

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

    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens leerling
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        name="language"
                        label="* Cursustaal:"
                        value={values.language}
                        onChange={handleInputChange}
                        items={languageItems}
                        error={errors.language}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        name="period"
                        label="* Periode:"
                        value={values.period}
                        onChange={handleInputChange}
                        items={periodItems}
                        error={errors.period}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Voornaam Leerling"
                        name="firstNameStudent"
                        value={values.firstNameStudent}
                        onChange={handleInputChange}
                        error={errors.firstNameStudent}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Naam Leerling"
                        name="lastNameStudent"
                        value={values.lastNameStudent}
                        onChange={handleInputChange}
                        error={errors.lastNameStudent}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomDatePicker
                        name="birthday"
                        label="Geboortedatum"
                        value={values.birthday}
                        onChange={handleInputChange}
                        error={errors.birthday}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="gender"
                        label="* Geslacht:"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                        error={errors.gender}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

export function getErrorStudentStep(values) {

    let errors = {}
    errors.language = values.language ? "" : "Gelieve de gewenste cursustaal aan te duiden."
    errors.period = values.period ? "" : "Gelieve de gewenste periode aan te duiden."
    errors.firstNameStudent = values.firstNameStudent ? "" : "Gelieve de voornaam van de leerling in te vullen."
    errors.lastNameStudent = values.lastNameStudent ? "" : "Gelieve de naam van de leerling in te vullen."
    errors.birthday = values.birthday ? "" : "Gelieve de geboortedatum van de leerling in te vullen."
    errors.gender = values.gender ? "" : "Gelieve het geslacht van de leerling in te vullen."
    return errors;
}
