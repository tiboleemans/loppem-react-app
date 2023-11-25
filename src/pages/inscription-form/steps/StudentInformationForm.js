import React from 'react';
import Grid from "@mui/material/Grid";
import {Form} from "../useForm";
import CustomTextField from "../custom/CustomTextField";
import CustomDatePicker from "../custom/CustomDatePicker";
import CustomButtonGroup from "../custom/CustomButtonGroup";
import {useTranslation} from "react-i18next";

export default function StudentInformationForm(props) {

  const {values, handleInputChange, errors, handleOnError} = props;
  const {t} = useTranslation();
  const languageItems = [
    {id: 'dutch', title: t("inscription.student.label.dutch")},
    {id: 'english', title: t("inscription.student.label.english")},
  ]

  const periodItems = [
    {id: 'july', title: t("inscription.student.label.july")},
    {id: 'august', title: t("inscription.student.label.august")},
  ]

  const genderItems = [
    {id: 'boy', title: t("inscription.student.label.boy")},
    {id: 'girl', title: t("inscription.student.label.girl")},
  ]

  const subject = "student";

  return (
    <Form>
      <h3 className="inscription-form-title">{t("inscription.steps.student")}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.student.label.firstName")}
            name="firstName"
            value={values.student.firstName}
            onChange={handleInputChange}
            error={errors.student.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="language"
            label={t("inscription.student.label.language")}
            value={values.student.language}
            onChange={handleInputChange}
            items={languageItems}
            error={errors.student.language}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.student.label.lastName")}
            name="lastName"
            value={values.student.lastName}
            onChange={handleInputChange}
            error={errors.student.lastName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="period"
            label={t("inscription.student.label.period")}
            value={values.student.period}
            onChange={handleInputChange}
            items={periodItems}
            error={errors.student.period}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <CustomDatePicker
            subject={subject}
            name="birthdate"
            label={t("inscription.student.label.birthdate")}
            value={values.student.birthdate}
            onChange={handleInputChange}
            error={errors.student.birthdate}
            onError={handleOnError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="gender"
            label={t("inscription.student.label.gender")}
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
