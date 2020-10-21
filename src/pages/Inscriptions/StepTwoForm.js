import React from 'react';
import useForm, {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";


const initialFieldValues = {
    firstNameParent: '',
    lastNameParent: '',
    email: '',
    relation: '',
    street: '',
    houseNr: '',
    busNr: '',

    city: '',
    zipCode: '',
    gsm: '',
    gsm2: '',
}

export default function StepTwoForm() {


    const relationItems = [
        {id: 'mother', title: 'Moeder'},
        {id: 'father', title: 'Vader'},
        {id: 'guardian', title: 'Voogd'},
    ]

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);


    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens ouder
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Voornaam ouder"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Naam ouder"
                        name="lastNameParent"
                        value={values.lastNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
