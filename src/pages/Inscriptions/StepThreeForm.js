import React from 'react';
import useForm, {Form} from "../../components/useForm";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import Typography from "@material-ui/core/Typography";


const initialFieldValues = {
    language: '',
    period: '',
    firstNameStudent: '',
    lastNameStudent: '',
    gender: '',
    birthday: null,

    firstNameParent: '',
    lastNameParent: '',
    email: '',
    acceptPictures: '',
    acceptTerms: ''
}

export default function StepThreeForm() {

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);


    return (
        <Form>
            <Typography variant="h5" gutterBottom>
                Extra informatie
            </Typography>

        </Form>
    )
}
