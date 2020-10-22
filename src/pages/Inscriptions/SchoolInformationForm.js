import React from 'react';
import useForm, {Form} from "../../components/useForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/controls/CustomTextField";
import CustomButtonGroup from "../../components/controls/CustomButtonGroup";


const initialFieldValues = {
    nameSchool: '',
    streetSchool: '',
    houseNrSchool: '',
    busNrSchool: '',
    citySchool: '',
    zipSchool: '',

    titleProfSchool: '',
    nameProfSchool: '',

    yearsSchool: '',
    hoursSchool: '',
    immersionSchool: '',
    reportSchool: '',

}

export default function SchoolInformationForm() {

    const {values, handleInputChange} = useForm(initialFieldValues);

    const titleProfItems = [
        {id: 'mister', title: 'Meneer'},
        {id: 'madam', title: 'Mevrouw'},
    ]

    const yearsSchoolItems = [
        {id: '0', title: '0'},
        {id: '1', title: '1'},
        {id: '2', title: '2'},
        {id: '3', title: '3'},
        {id: '4', title: '4'},
        {id: '5', title: '5'},
        {id: '6', title: '6'},
        {id: '7', title: '7+'},
    ]

    const hoursSchoolItems = [
        {id: '0', title: '0'},
        {id: '1', title: '1'},
        {id: '2', title: '2'},
        {id: '3', title: '3'},
        {id: '4', title: '4'},
        {id: '5', title: '5'},
        {id: '6', title: '6'},
        {id: '7', title: '7+'},
    ]

    const immersionSchoolItems = [
        {id: 'yes', title: 'Ja'},
        {id: 'no', title: 'Nee'},
    ]

    const reportSchoolItems = [
        {id: 'yes', title: 'Ja'},
        {id: 'no', title: 'Nee'},
    ]

    return (
        <Form>
            <Typography variant="h5" gutterBottom>
                Gegevens school
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Naam school"
                        name="nameSchool"
                        value={values.nameSchool}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item sm={6}/>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Straat"
                        name="streetSchool"
                        value={values.streetSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        label="Huisnummer"
                        name="houseNrSchool"
                        value={values.houseNrSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <CustomTextField
                        label="Busnummer"
                        name="busNrSchool"
                        value={values.busNrSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Gemeente"
                        name="citySchool"
                        value={values.citySchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Postcode"
                        name="zipSchool"
                        value={values.zipSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="titleProfSchool"
                        label="Aanspreektitel leerkracht"
                        value={values.titleProfSchool}
                        onChange={handleInputChange}
                        items={titleProfItems}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Naam leerkracht"
                        name="nameProfSchool"
                        value={values.nameProfSchool}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="yearsSchool"
                        label="Aantal jaren Nederlands of Engels op school"
                        value={values.yearsSchool}
                        onChange={handleInputChange}
                        items={yearsSchoolItems}/>
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="hoursSchool"
                        label="Aanal schooluren Nederlands of Engels per week"
                        value={values.hoursSchool}
                        onChange={handleInputChange}
                        items={hoursSchoolItems}/>
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="immersionSchool"
                        label="Volgt uw kind tweetalig onderwijs voor de gekozen doeltaal op school?"
                        value={values.immersionSchool}
                        onChange={handleInputChange}
                        items={immersionSchoolItems}/>
                </Grid>

                <Grid item xs={12} sm={6} style={{marginTop: '-10px'}}>
                    <CustomButtonGroup
                        name="reportSchool"
                        label="Moet er een rapport na de stage opgestuurd worden naar de school?"
                        value={values.reportSchool}
                        onChange={handleInputChange}
                        items={reportSchoolItems}/>
                </Grid>
            </Grid>

        </Form>
    )
}
