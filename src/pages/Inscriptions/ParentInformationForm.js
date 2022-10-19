import React from 'react';
import {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


export default function ParentInformationForm(props) {

    const {values, handleInputChange, errors} = props;

    const relationItems = [
        {id: 'mother', title: 'Moeder'},
        {id: 'father', title: 'Vader'},
        {id: 'guardian', title: 'Voogd'},
    ]


    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens ouder
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="Voornaam ouder"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                        error={errors.firstNameParent}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="Naam ouder"
                        name="lastNameParent"
                        value={values.lastNameParent}
                        onChange={handleInputChange}
                        error={errors.lastNameParent}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="E-mail"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        subject="parent"
                        name="relation"
                        label="* Relatie met leerling:"
                        value={values.relation}
                        onChange={handleInputChange}
                        items={relationItems}
                        error={errors.relation}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="Straat"
                        name="street"
                        value={values.street}
                        onChange={handleInputChange}
                        error={errors.street}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        subject="parent"
                        label="Huisnummer"
                        name="houseNr"
                        value={values.houseNr}
                        onChange={handleInputChange}
                        error={errors.houseNr}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        subject="parent"
                        label="Busnummer"
                        name="busNr"
                        value={values.busNr}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="Gemeente"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="Postcode"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleInputChange}
                        error={errors.zipCode}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="GSM"
                        name="gsm"
                        value={values.gsm}
                        onChange={handleInputChange}
                        error={errors.gsm}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        subject="parent"
                        label="2e telefoonnummer"
                        name="gsm2"
                        value={values.gsm2}
                        onChange={handleInputChange}
                        error={errors.gsm2}
                    />
                </Grid>

            </Grid>
        </Form>
    )
}

export function getErrorParentStep(values) {
    let errors = {}
    errors.firstNameParent = values.firstNameParent ? "" : "Gelieve uw voornaam in te vullen.\n"
    errors.lastNameParent = values.lastNameParent ? "" : "Gelieve uw naam in te vullen."
    errors.email = values.email ? "" : "Gelieve uw e-mailadres in te vullen."
    errors.relation = values.relation ? "" : "Gelieve uw relatie met de leerling aan te duiden."
    errors.street = values.street ? "" : "Gelieve uw adres volledig in te vullen."
    errors.houseNr = values.houseNr ? "" : "Gelieve uw huisnummer in te vullen."
    errors.city = values.city ? "" : "Gelieve uw gemeente in te vullen."
    errors.zipCode = values.zipCode ? "" : "Gelieve uw postcode in te vullen."
    errors.gsm = values.gsm ? "" : "Gelieve uw gsm nummer in te vullen."
    errors.gsm2 = values.gsm2 ? "" : "Gelieve het nummer in geval van nood in te vullen."
    return errors;
}
