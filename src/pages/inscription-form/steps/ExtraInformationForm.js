import {Form} from "../useForm";
import CustomCheckbox from "../custom/CustomCheckbox";
import React from "react";
import Grid from "@mui/material/Grid";
import CustomTextArea from "../custom/CustomTextArea";
import CustomSelect from "../custom/CustomSelect";
import {Trans, useTranslation} from "react-i18next";
import PicturesDialog from "../custom/PicturesDialog";
import ConditionsDialog from "../custom/ConditionsDialog";
import PrivacyDialog from "../custom/PrivacyDialog";

export default function ExtraInformationForm(props) {

  const {values, handleInputChange, errors} = props;
  const {t} = useTranslation();

  const contactItems = [
    {id: 'isOldStudent', title: t("inscription.extra.label.contact.choice.1")},
    {id: 'viavia', title: t("inscription.extra.label.contact.choice.2")},
    {id: 'viaOldStudent', title: t("inscription.extra.label.contact.choice.3")},
    {id: 'socials', title: t("inscription.extra.label.contact.choice.4")},
    {id: 'brochure', title: t("inscription.extra.label.contact.choice.5")},
    {id: 'internet', title: t("inscription.extra.label.contact.choice.6")},
    {id: 'school', title: t("inscription.extra.label.contact.choice.7")},
    {id: 'juvigo', title: t("inscription.extra.label.contact.choice.8")},
    {id: 'other', title: t("inscription.extra.label.contact.choice.9")}
  ]

  return (
    <Form>
      <h3 className="inscription-form-title">{t("inscription.steps.extra")}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomSelect
            subject="extra"
            labelId="contactLabelId"
            labelText={t("inscription.extra.label.contact.placeHolder")}
            name={"contact"}
            id={"contact"}
            value={values.extra.contact}
            onChange={handleInputChange}
            items={contactItems}
            error={errors.extra.contact}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextArea
            subject="extra"
            label={t("inscription.extra.label.kitchen.info")}
            name="foodInfo"
            value={values.extra.foodInfo}
            onChange={handleInputChange}
            helperText={t("inscription.extra.label.kitchen.example")}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextArea
            subject="extra"
            label={t("inscription.extra.label.extra.info")}
            name="additionalInfo"
            value={values.extra.additionalInfo}
            onChange={handleInputChange}
            helperText={t("inscription.extra.label.extra.example")}
          />
        </Grid>


        <Grid item xs={12}>
          {/*answer: <Trans i18nKey="inscription.extra.label.pictures" components={{scrollTo: <ScrollTo to="inscription" className="link"/>, header: <h3/>}}/>,*/}
          <CustomCheckbox
            subject="extra"
            name="acceptPictures"
            label={<Trans i18nKey="inscription.extra.label.pictures.label" components={{dialog: <PicturesDialog/>, header: <h3/>}}/>}
            value={values.extra.acceptPictures}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomCheckbox
            subject="extra"
            name="acceptTerms"
            label={<Trans i18nKey="inscription.extra.label.conditions.label"
                          components={{conditions: <ConditionsDialog/>, privacy: <PrivacyDialog/>}}/>}
            value={values.extra.acceptTerms}
            onChange={handleInputChange}
            error={errors.extra.acceptTerms}
          />
        </Grid>
      </Grid>
    </Form>
  )
}

export function updateExtraInfoErrors(values, errors) {

}
