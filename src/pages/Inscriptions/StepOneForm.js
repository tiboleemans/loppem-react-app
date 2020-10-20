import React from 'react';
import Grid from "@material-ui/core/Grid";
import useForm, {Form} from "../../components/useForm";
import CustomInput from "../../components/controls/CustomInput";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomCheckbox from "../../components/controls/CustomCheckbox";
import CustomDatePicker from "../../components/controls/CustomDatePicker";
import CustomButton from "../../components/controls/CustomButton";
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
    relation: '',
    street: '',
    houseNr: '',
    busNr: '',

    city: '',
    zipCode: '',
    gsm: '',
    gsm2: '',

    acceptPictures: '',
    acceptTerms: ''
}

export default function StepOneForm() {


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
                Informatie leerling
            </Typography>

            <Grid container>
                <Grid item xs={12} md={6}>
                    <CustomRadioGroup
                        name="language"
                        label="* Cursustaal:"
                        values={values.language}
                        onChange={handleInputChange}
                        items={languageItems}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomRadioGroup
                        name="period"
                        label="* Periode:"
                        value={values.period}
                        onChange={handleInputChange}
                        items={periodItems}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomInput
                        label="Voornaam Leerling"
                        name="firstNameStudent"
                        value={values.firstNameStudent}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CustomInput
                        label="Naam Leerling"
                        name="lastNameStudent"
                        value={values.lastNameStudent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomDatePicker
                        name="birthday"
                        label="Geboortedatum"
                        value={values.birthday}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CustomRadioGroup
                        name="gender"
                        label="* Geslacht:"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
                Informatie ouder
            </Typography>

            <Grid container>
                <Grid item xs={12} md={6}>
                    <CustomInput
                        label="Voornaam ouder"
                        name="firstNameParent"
                        value={values.firstNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomInput
                        label="Naam ouder"
                        name="lastNameParent"
                        value={values.lastNameParent}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomCheckbox
                    name="acceptPictures"
                    label="Ik geef toestemming om foto's van mijn kind te gebruiken voor commerciële doeleinden (klik hier voor details)"
                    value={values.acceptPictures}
                    onChange={handleInputChange}
                />
                <CustomCheckbox
                    name="acceptTerms"
                    label="Ik aanvaard de algemene voorwaarden en privacyregels"
                    value={values.acceptTerms}
                    onChange={handleInputChange}
                />
            </Grid>
            <div>
                <CustomButton
                    text="Inschrijven"
                    type="Submit"
                />
            </div>
        </Form>
    )
}
