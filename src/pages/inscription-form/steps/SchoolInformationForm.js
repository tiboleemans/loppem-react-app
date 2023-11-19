import React from 'react';
import {Form} from "../useForm";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomButtonGroup from "../custom/CustomButtonGroup";


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
            value={values?.school?.nameSchool}
            onChange={handleInputChange}
            error={errors?.school.nameSchool}
          />
        </Grid>
        <Grid item sm={6}/>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="school"
            label="Straat"
            name="streetSchool"
            value={values?.school?.streetSchool}
            onChange={handleInputChange}
            error={errors?.school.streetSchool}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject="school"
            label="Huisnummer"
            name="houseNrSchool"
            value={values?.school?.houseNrSchool}
            onChange={handleInputChange}
            error={errors?.school.houseNrSchool}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject="school"
            label="Busnummer"
            name="busNrSchool"
            value={values?.school?.busNrSchool}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="school"
            label="Gemeente"
            name="citySchool"
            value={values?.school?.citySchool}
            onChange={handleInputChange}
            error={errors?.school.citySchool}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="school"
            label="Postcode"
            name="zipSchool"
            value={values?.school?.zipSchool}
            onChange={handleInputChange}
            error={errors?.school.zipSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="school"
            name="titleProfSchool"
            label="Aanspreektitel leerkracht"
            value={values?.school?.titleProfSchool}
            onChange={handleInputChange}
            items={titleProfItems}
            error={errors?.school.titleProfSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject="school"
            label="Naam leerkracht"
            name="nameProfSchool"
            value={values?.school?.nameProfSchool}
            onChange={handleInputChange}
            error={errors?.school.nameProfSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="school"
            name="yearsSchool"
            label="Aantal jaren Nederlands of Engels op school"
            value={values?.school?.yearsSchool}
            onChange={handleInputChange}
            items={yearsSchoolItems}
            error={errors?.school.yearsSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="school"
            name="hoursSchool"
            label="Aanal schooluren Nederlands of Engels per week"
            value={values?.school?.hoursSchool}
            onChange={handleInputChange}
            items={hoursSchoolItems}
            error={errors?.school.hoursSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="school"
            name="immersionSchool"
            label="Volgt uw kind tweetalig onderwijs voor de gekozen doeltaal op school?"
            value={values?.school?.immersionSchool}
            onChange={handleInputChange}
            items={immersionSchoolItems}
            error={errors?.school.immersionSchool}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
          <CustomButtonGroup
            subject="school"
            name="reportSchool"
            label="Moet er een rapport na de stage opgestuurd worden naar de school?"
            value={values?.school?.reportSchool}
            onChange={handleInputChange}
            items={reportSchoolItems}
            error={errors?.school.reportSchool}
          />
        </Grid>
      </Grid>

    </Form>
  )
}

