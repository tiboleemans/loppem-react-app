import useForm, {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const initialFieldValues = {
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

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

            <CustomCheckbox
                name="acceptPictures"
                label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                value={values.acceptPictures}
                onChange={handleInputChange}
            />

            <Grid xs={12} row>
                <CustomCheckbox
                    name="acceptTerms"
                    label="Ik aanvaard de algemene voorwaarden en privacyregels"
                    value={values.acceptTerms}
                    onChange={handleInputChange}
                />
            </Grid>
        </Form>
    )
}
