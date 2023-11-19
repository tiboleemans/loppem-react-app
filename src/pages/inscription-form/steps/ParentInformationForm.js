import React from 'react';
import {Form} from "../useForm";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomButtonGroup from "../custom/CustomButtonGroup";


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
            value={values.parent.firstNameParent}
            onChange={handleInputChange}
            error={errors.parent.firstNameParent}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="Naam ouder"
            name="lastNameParent"
            value={values.parent.lastNameParent}
            onChange={handleInputChange}
            error={errors.parent.lastNameParent}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="E-mail"
            name="email"
            type="email"
            value={values.parent.email}
            onChange={handleInputChange}
            error={errors.parent.email}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="parent"
            name="relation"
            label="* Relatie met leerling:"
            value={values.parent.relation}
            onChange={handleInputChange}
            items={relationItems}
            error={errors.parent.relation}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="Straat"
            name="street"
            value={values.parent.street}
            onChange={handleInputChange}
            error={errors.parent.street}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject="parent"
            label="Huisnummer"
            name="houseNr"
            value={values.parent.houseNr}
            onChange={handleInputChange}
            error={errors.parent.houseNr}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject="parent"
            label="Busnummer"
            name="busNr"
            value={values.parent.busNr}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="Gemeente"
            name="city"
            value={values.parent.city}
            onChange={handleInputChange}
            error={errors.parent.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="Postcode"
            name="zipCode"
            value={values.parent.zipCode}
            onChange={handleInputChange}
            error={errors.parent.zipCode}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="GSM"
            name="gsm"
            value={values.parent.gsm}
            onChange={handleInputChange}
            error={errors.parent.gsm}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="parent"
            label="2e telefoonnummer"
            name="gsm2"
            value={values.parent.gsm2}
            onChange={handleInputChange}
            error={errors.parent.gsm2}
          />
        </Grid>

      </Grid>
    </Form>
  )
}
