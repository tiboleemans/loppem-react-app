import {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import React from "react";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomTextArea from "../../components/controls/CustomTextArea";
import CustomSelect from "../../components/controls/CustomSelect";

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
            <Typography variant="h5" gutterBottom>
                Extra informatie
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <CustomTextField
                        label="Naam nieuw aangebrachte leerling"
                        name="apportedStudent"
                        value={values.apportedStudent}
                        onChange={handleInputChange}
                        helperText={"Geniet van een korting door een nieuwe leerling aan te brengen (klik hier om de voorwaarden te lezen)"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect
                        labelId="contactLabelId"
                        labelText="Hoe bent u in contact gekomen met de cursus?"
                        name={"contact"}
                        id={"contact"}
                        value={values.contact}
                        onChange={handleInputChange}
                        items={contactItems}
                        error={errors.contact}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextArea
                        label="Relevante informatie voor de kok"
                        name="foodInfo"
                        value={values.foodInfo}
                        onChange={handleInputChange}
                        helperText={"(voedselallergiën, intoleranties, vegetarish, ...)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextArea
                        label="Extra informatie over uw zoon of dochter"
                        name="additionalInfo"
                        value={values.additionalInfo}
                        onChange={handleInputChange}
                        helperText={"(medisch, allergiën, examens, kamerindeling, ...)"}
                    />
                </Grid>


                <Grid item xs={12}>
                    <CustomCheckbox
                        name="acceptPictures"
                        label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                        value={values.acceptPictures}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomCheckbox
                        name="acceptTerms"
                        label="Ik aanvaard de algemene voorwaarden en privacyregels"
                        value={values.acceptTerms}
                        onChange={handleInputChange}
                        error={errors.acceptTerms}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

export function getErrorExtraInfoStep(values) {
    let errors = {}
    errors.contact = values.contact ? "" : "Gelieve aan te duiden via welke weg u in contact bent gekomen met Loppem Conversa."
    errors.acceptTerms = values.acceptTerms ? "" : "Gelieve het cursusreglement te lezen en te accepteren."
    return errors;
}
