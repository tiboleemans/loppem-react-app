import React from 'react';
import Grid from "@mui/material/Grid";
import {Form} from "../useForm";
import CustomTextField from "../custom/CustomTextField";
import CustomDatePicker from "../custom/CustomDatePicker";
import CustomButtonGroup from "../custom/CustomButtonGroup";

export default function StudentInformationForm(props) {

  const {values, handleInputChange, errors, handleOnError} = props;

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="student"
            label="Voornaam Leerling"
            name="firstNameStudent"
            value={values.student.firstNameStudent}
            onChange={handleInputChange}
            error={errors.student.firstNameStudent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject="student"
            name="language"
            label="* Cursustaal:"
            value={values.student.language}
            onChange={handleInputChange}
            items={languageItems}
            error={errors.student.language}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="student"
            label="Naam Leerling"
            name="lastNameStudent"
            value={values.student.lastNameStudent}
            onChange={handleInputChange}
            error={errors.student.lastNameStudent}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject="student"
            name="period"
            label="* Periode:"
            value={values.student.period}
            onChange={handleInputChange}
            items={periodItems}
            error={errors.student.period}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <CustomDatePicker
            subject="student"
            name="birthday"
            label="Geboortedatum"
            value={values.student.birthday}
            onChange={handleInputChange}
            error={errors.student.birthday}
            onError={handleOnError}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="student"
            name="gender"
            label="* Geslacht:"
            value={values.student.gender}
            onChange={handleInputChange}
            items={genderItems}
            error={errors.student.gender}
          />
        </Grid>
      </Grid>

    </Form>
  )
}
