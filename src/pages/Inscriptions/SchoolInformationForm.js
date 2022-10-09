import React from 'react';
import {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


export default function SchoolInformationForm(props) {

    const {values, handleInputChange, errors} = props;

    const titleProfItems = [
        {id: 'mister', title: 'Meneer'},
        {id: 'madam', title: 'Mevrouw'},
    ]

    const yearsSchoolItems = [
        {id: '0', title: '0'},
        {id: '1', title: '1'},
        {id: '2', title: '2'},
        {id: '3', title: '3'},
        {id: '4', title: '4'},
        {id: '5', title: '5'},
        {id: '6', title: '6'},
        {id: '7', title: '7+'},
    ]

    const hoursSchoolItems = [
        {id: '0', title: '0'},
        {id: '1', title: '1'},
        {id: '2', title: '2'},
        {id: '3', title: '3'},
        {id: '4', title: '4'},
        {id: '5', title: '5'},
        {id: '6', title: '6'},
        {id: '7', title: '7+'},
    ]

    const immersionSchoolItems = [
        {id: 'yes', title: 'Ja'},
        {id: 'no', title: 'Nee'},
    ]

    const reportSchoolItems = [
        {id: 'yes', title: 'Ja'},
        {id: 'no', title: 'Nee'},
    ]

    return (
        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens school
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="school"
                        label="Naam school"
                        name="nameSchool"
                        value={values.nameSchool}
                        onChange={handleInputChange}
                        error={errors.nameSchool}
                    />
                </Grid>
                <Grid item sm={6}/>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="school"
                        label="Straat"
                        name="streetSchool"
                        value={values.streetSchool}
                        onChange={handleInputChange}
                        error={errors.streetSchool}
                    />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        subject="school"
                        label="Huisnummer"
                        name="houseNrSchool"
                        value={values.houseNrSchool}
                        onChange={handleInputChange}
                        error={errors.houseNrSchool}
                    />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        subject="school"
                        label="Busnummer"
                        name="busNrSchool"
                        value={values.busNrSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="school"
                        label="Gemeente"
                        name="citySchool"
                        value={values.citySchool}
                        onChange={handleInputChange}
                        error={errors.citySchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="school"
                        label="Postcode"
                        name="zipSchool"
                        value={values.zipSchool}
                        onChange={handleInputChange}
                        error={errors.zipSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="school"
                        name="titleProfSchool"
                        label="Aanspreektitel leerkracht"
                        value={values.titleProfSchool}
                        onChange={handleInputChange}
                        items={titleProfItems}
                        error={errors.titleProfSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="school"
                        label="Naam leerkracht"
                        name="nameProfSchool"
                        value={values.nameProfSchool}
                        onChange={handleInputChange}
                        error={errors.nameProfSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="school"
                        name="yearsSchool"
                        label="Aantal jaren Nederlands of Engels op school"
                        value={values.yearsSchool}
                        onChange={handleInputChange}
                        items={yearsSchoolItems}
                        error={errors.yearsSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="school"
                        name="hoursSchool"
                        label="Aanal schooluren Nederlands of Engels per week"
                        value={values.hoursSchool}
                        onChange={handleInputChange}
                        items={hoursSchoolItems}
                        error={errors.hoursSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="school"
                        name="immersionSchool"
                        label="Volgt uw kind tweetalig onderwijs voor de gekozen doeltaal op school?"
                        value={values.immersionSchool}
                        onChange={handleInputChange}
                        items={immersionSchoolItems}
                        error={errors.immersionSchool}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="school"
                        name="reportSchool"
                        label="Moet er een rapport na de stage opgestuurd worden naar de school?"
                        value={values.reportSchool}
                        onChange={handleInputChange}
                        items={reportSchoolItems}
                        error={errors.reportSchool}
                    />
                </Grid>
            </Grid>

        </Form>
    )
}

export function getErrorSchoolStep(values) {

    let errors = {}
    errors.nameSchool = values.nameSchool ? "" : "Gelieve de naam van de school in te vullen."
    errors.streetSchool = values.streetSchool ? "" : "Gelieve de straat van de school in te vullen."
    errors.houseNrSchool = values.houseNrSchool ? "" : "Gelieve het huisnummer van de school in te vullen."
    errors.citySchool = values.citySchool ? "" : "Gelieve de gemeente van de school in te vullen."
    errors.zipSchool = values.zipSchool ? "" : "Gelieve de postcode van de school in te vullen."
    errors.titleProfSchool = values.titleProfSchool ? "" : "Gelieve de aanspreektitel van de leerkracht in te vullen."
    errors.nameProfSchool = values.nameProfSchool ? "" : "Gelieve de naam van de leerkracht in te vullen."
    errors.yearsSchool = values.yearsSchool ? "" : "Gelieve het aantal jaren van de gekozen taal op school aan te duiden."
    errors.hoursSchool = values.hoursSchool ? "" : "Gelieve het aantal uren per week van de gekozen taal op school aan te duiden."
    errors.immersionSchool = values.immersionSchool ? "" : "Gelieve aan te duiden of de leerling immersie volgt."
    errors.reportSchool = values.reportSchool ? "" : "Gelieve aan te duiden of u een rapport wenst op te sturen naar de school na de stage."
    return errors;


}
