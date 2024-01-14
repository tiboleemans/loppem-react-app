import React from 'react';
import {Form} from "../useForm";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomButtonGroup from "../custom/CustomButtonGroup";
import {useTranslation} from "react-i18next";


export default function ParentInformationForm(props) {

  const {values, handleInputChange, errors, handleOnError, showValidation} = props;
  const {t} = useTranslation();

  const relationItems = [
    {id: 'mother', title: t("inscription.parent.label.mother")},
    {id: 'father', title: t("inscription.parent.label.father")},
    {id: 'guardian', title: t("inscription.parent.label.guardian")},
  ]

  const subject = "parent";

  return (
    <Form>
      <h3 className="inscription-form-title">{t("inscription.steps.parent")}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.firstName")}
            name="firstName"
            value={values.parent.firstName}
            onChange={handleInputChange}
            error={errors.parent.firstName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.lastName")}
            name="lastName"
            value={values.parent.lastName}
            onChange={handleInputChange}
            error={errors.parent.lastName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.email")}
            name="email"
            type="email"
            showValidation={showValidation}
            value={values.parent.email}
            onChange={handleInputChange}
            onError={handleOnError}
            error={errors.parent.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomButtonGroup
            subject={subject}
            name="relation"
            label={t("inscription.parent.label.relation")}
            value={values.parent.relation}
            onChange={handleInputChange}
            items={relationItems}
            error={errors.parent.relation}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.street")}
            name="street"
            value={values.parent.street}
            onChange={handleInputChange}
            error={errors.parent.street}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.houseNr")}
            name="houseNr"
            value={values.parent.houseNr}
            onChange={handleInputChange}
            error={errors.parent.houseNr}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.busNr")}
            name="busNr"
            value={values.parent.busNr}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.city")}
            name="city"
            value={values.parent.city}
            onChange={handleInputChange}
            error={errors.parent.city}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.zip")}
            name="zipCode"
            value={values.parent.zipCode}
            onChange={handleInputChange}
            error={errors.parent.zipCode}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.gsm")}
            name="gsm"
            type="phone"
            value={values.parent.gsm}
            onChange={handleInputChange}
            error={errors.parent.gsm}
            onError={handleOnError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            subject={subject}
            label={t("inscription.parent.label.gsm2")}
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
