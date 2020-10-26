import React from 'react';
import {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


export default function ParentInformationForm(props) {

    const {values, handleInputChange} = props;

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
                        label="Voornaam ouder"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Naam ouder"
                        name="lastNameParent"
                        value={values.lastNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="E-mail"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="relation"
                        label="* Relatie met leerling:"
                        value={values.relation}
                        onChange={handleInputChange}
                        items={relationItems}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Straat"
                        name="street"
                        value={values.street}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        label="Huisnummer"
                        name="houseNr"
                        value={values.houseNr}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        label="Busnummer"
                        name="busNr"
                        value={values.busNr}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Gemeente"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Postcode"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="GSM"
                        name="gsm"
                        value={values.gsm}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="2e telefoonnummer"
                        name="gsm2"
                        value={values.gsm2}
                        onChange={handleInputChange}
                    />
                </Grid>

            </Grid>
        </Form>
    )
}
