import React from 'react';
import Grid from "@material-ui/core/Grid";
import useForm, {Form} from "../../components/useForm";
import CustomInput from "../../components/controls/CustomInput";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import CustomButton from "../../components/controls/CustomButton";
import Typography from "@material-ui/core/Typography";
import CustomCard from "../../components/controls/CustomCard";
import Paper from "@material-ui/core/Paper";


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

export default function StepTwoForm() {


    const languageItems = [
        {id: 'dutch', title: 'Nederlands'},
        {id: 'english', title: 'Engels'},
    ]

    const periodItems = [
        {id: 'july', title: 'Juli'},
        {id: 'augusts', title: 'Augustus'},
    ]

    const genderItems = [
        {id: 'boy', title: 'Jongen'},
        {id: 'girl', title: 'Meisje'},
    ]

    const {
        values, setValues, handleInputChange
    } = useForm(initialFieldValues);


    return (

        <Form>
            <Typography variant="h5" gutterBottom>
                Informatie van de school
            </Typography>
        </Form>
    )
}
