import useForm, {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import CustomTextArea from "../../components/controls/CustomTextArea";

const initialFieldValues = {

    acceptPictures: '',
    acceptTerms: ''
}
const useStyles = makeStyles((theme) => ({
    row: {
        marginBottom: 0.1,
    }
}));

export default function StepFourForm() {

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);
    return (
        <Form>
            <Typography variant="h5" gutterBottom>
                Extra informatie
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <CustomTextField
                        label="Naam nieuw aangebrachte leerling"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                        helperText={"Geniet van een korting door een nieuwe leerling aan te brengen (klik hier om de voorwaarden te lezen)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextArea
                        label="Relevante informatie voor de kok"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                        helperText={"(voedselallergiën, intoleranties, vegetarish, ...)"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextArea
                        label="Extra informatie over uw zoon of dochter"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                        helperText={"(medisch, allergiën, examens, kamerindeling, ...)"}
                    />
                </Grid>


                <Grid xs={12} row>
                    <CustomCheckbox
                        name="acceptPictures"
                        label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                        value={values.acceptPictures}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid xs={12} row>
                    <CustomCheckbox
                        name="acceptTerms"
                        label="Ik aanvaard de algemene voorwaarden en privacyregels"
                        value={values.acceptTerms}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
