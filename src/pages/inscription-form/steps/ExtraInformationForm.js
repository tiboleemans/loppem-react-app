import {Form} from "../useForm";
import CustomCheckbox from "../custom/CustomCheckbox";
import React from "react";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomTextArea from "../custom/CustomTextArea";
import CustomSelect from "../custom/CustomSelect";
import {useTranslation} from "react-i18next";

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
        {id: 'other', title: t("inscription.extra.label.contact.choice.8")}
    ]

    return (
        <Form>
            <h3 className="inscription-form-title">{t("inscription.steps.extra")}</h3>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomTextField
                        subject="extra"
                        label={t("inscription.extra.label.referral.name")}
                        name="referral"
                        value={values.extra.referral}
                        onChange={handleInputChange}
                        helperText={t("inscription.extra.label.referral.condition")}
                    />
                </Grid>
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
                    <CustomCheckbox
                        subject="extra"
                        name="acceptPictures"
                        label={t("inscription.extra.label.pictures")}
                        value={values.extra.acceptPictures}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomCheckbox
                        subject="extra"
                        name="acceptTerms"
                        label={t("inscription.extra.label.conditions")}
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
