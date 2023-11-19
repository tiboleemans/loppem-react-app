import {Form} from "../useForm";
import Typography from "@mui/material/Typography";
import CustomCheckbox from "../custom/CustomCheckbox";
import React from "react";
import Grid from "@mui/material/Grid";
import CustomTextField from "../custom/CustomTextField";
import CustomTextArea from "../custom/CustomTextArea";
import CustomSelect from "../custom/CustomSelect";

const contactItems = [
    {id: 'viavia', title: 'Mond-tot-mond-reclame'},
    {id: 'internet', title: 'Via het internet'},
    {id: 'school', title: 'Via de school'},
    {id: 'isOldStudent', title: 'Ik ben een oud-leerling'},
    {id: 'viaOldStudent', title: 'Via een oud-leerling'},
    {id: 'news', title: 'Via het nieuws'},
    {id: 'brochure', title: 'Via de brochure'},
    {id: 'ad', title: 'Krant/magazine'},
    {id: 'other', title: 'Andere'}
]

export default function ExtraInformationForm(props) {

    const {values, handleInputChange, errors} = props;

    return (
        <Form>
            <h4>
                Extra informatie
            </h4>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <CustomTextField
                        subject="extra"
                        label="Naam nieuw aangebrachte leerling"
                        name="apportedStudent"
                        value={values.extra.apportedStudent}
                        onChange={handleInputChange}
                        helperText={"Geniet van een korting door een nieuwe leerling aan te brengen (klik hier om de voorwaarden te lezen)"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect
                        subject="extra"
                        labelId="contactLabelId"
                        labelText="Hoe bent u in contact gekomen met de cursus?"
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
                        label="Relevante informatie voor de kok"
                        name="foodInfo"
                        value={values.extra.foodInfo}
                        onChange={handleInputChange}
                        helperText={"(voedselallergiën, intoleranties, vegetarish, ...)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextArea
                        subject="extra"
                        label="Extra informatie over uw zoon of dochter"
                        name="additionalInfo"
                        value={values.extra.additionalInfo}
                        onChange={handleInputChange}
                        helperText={"(medisch, allergiën, examens, kamerindeling, ...)"}
                    />
                </Grid>


                <Grid item xs={12}>
                    <CustomCheckbox
                        subject="extra"
                        name="acceptPictures"
                        label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                        value={values.extra.acceptPictures}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomCheckbox
                        subject="extra"
                        name="acceptTerms"
                        label="Ik aanvaard de algemene voorwaarden en privacyregels"
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
