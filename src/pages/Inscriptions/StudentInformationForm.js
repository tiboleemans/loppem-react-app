import React from 'react';
import Grid from "@mui/material/Grid";
import {Form} from "../../components/useForm";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import Typography from "@mui/material/Typography";
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
            <Typography variant="h3" gutterBottom>
                Gegevens leerling
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        subject="student"
                        name="language"
                        label="* Cursustaal:"
                        value={values?.student?.language}
                        onChange={handleInputChange}
                        items={languageItems}
                        error={errors.language}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomButtonGroup
                        subject="student"
                        name="period"
                        label="* Periode:"
                        value={values?.student?.period}
                        onChange={handleInputChange}
                        items={periodItems}
                        error={errors.period}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="student"
                        label="Voornaam Leerling"
                        name="firstNameStudent"
                        value={values?.student?.firstNameStudent}
                        onChange={handleInputChange}
                        error={errors.firstNameStudent}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="student"
                        label="Naam Leerling"
                        name="lastNameStudent"
                        value={values?.student?.lastNameStudent}
                        onChange={handleInputChange}
                        error={errors.lastNameStudent}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomDatePicker
                        subject="student"
                        name="birthday"
                        label="Geboortedatum"
                        value={values?.student?.birthday}
                        onChange={handleInputChange}
                        error={errors.birthday}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="student"
                        name="gender"
                        label="* Geslacht:"
                        value={values?.student?.gender}
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

    const errors = {}
    errors.language = values.student.language ? "" : "Gelieve de gewenste cursustaal aan te duiden."
    errors.period = values.student.period ? "" : "Gelieve de gewenste periode aan te duiden."
    errors.firstNameStudent = values.student.firstNameStudent ? "" : "Gelieve de voornaam van de leerling in te vullen."
    errors.lastNameStudent = values.student.lastNameStudent ? "" : "Gelieve de naam van de leerling in te vullen."
    errors.birthday = values.student.birthday ? "" : "Gelieve de geboortedatum van de leerling in te vullen."
    errors.gender = values.student.gender ? "" : "Gelieve het geslacht van de leerling in te vullen."
    return errors;
}
