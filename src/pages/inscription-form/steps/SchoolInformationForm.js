import React from 'react';
import {Form} from "../useForm";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomButtonGroup from "../custom/CustomButtonGroup";
import {useTranslation} from "react-i18next";


export default function SchoolInformationForm(props) {

  const {values, handleInputChange, errors} = props;
  const {t} = useTranslation();
  const titleProfItems = [
    {id: 'mister', title: 'Meneer'},
    {id: 'madam', title: 'Mevrouw'},
  ]

  const yearsItems = [
    {id: '0', title: '0'},
    {id: '1', title: '1'},
    {id: '2', title: '2'},
    {id: '3', title: '3'},
    {id: '4', title: '4'},
    {id: '5', title: '5'},
    {id: '6', title: '6'},
    {id: '7', title: '7+'},
  ]

  const hoursItems = [
    {id: '0', title: '0'},
    {id: '1', title: '1'},
    {id: '2', title: '2'},
    {id: '3', title: '3'},
    {id: '4', title: '4'},
    {id: '5', title: '5'},
    {id: '6', title: '6'},
    {id: '7', title: '7+'},
  ]

  const immersionItems = [
    {id: 'yes', title: t("inscription.school.label.yes")},
    {id: 'no', title: t("inscription.school.label.no")}
  ]

  const subject = "school";

  return (
    <Form>
      <h3 className="inscription-form-title">{t("inscription.steps.school")}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.school.label.name")}
            name="name"
            value={values.school.name}
            onChange={handleInputChange}
            error={errors.school.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.school.label.city")}
            name="city"
            value={values.school.city}
            onChange={handleInputChange}
            error={errors.school.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="years"
            label={t("inscription.school.label.count.years")}
            value={values.school.years}
            onChange={handleInputChange}
            items={yearsItems}
            error={errors.school.years}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="hours"
            label={t("inscription.school.label.count.hours")}
            value={values.school.hours}
            onChange={handleInputChange}
            items={hoursItems}
            error={errors.school.hours}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="immersion"
            label={t("inscription.school.label.immersion")}
            value={values.school.immersion}
            onChange={handleInputChange}
            items={immersionItems}
            error={errors.school.immersion}
          />
        </Grid>
      </Grid>

    </Form>
  )
}

