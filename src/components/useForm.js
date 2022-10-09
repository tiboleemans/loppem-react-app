import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Axios} from "../firebase/firebaseConfig";
import {useParams} from "react-router";

const initialFieldValues = {
    id: '',
    // StudentInformation
    student: {
        language: '',
        period: '',
        firstNameStudent: '',
        lastNameStudent: '',
        gender: '',
        birthday: null,
    },
    // ParentInformation
    parent: {
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
    },

    // SchoolInformation
    school: {
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
        reportSchool: ''
    },

    extra: {
        // ExtraInformation
        apportedStudent: '',
        contact: '',
        additionalInfo: '',
        foodInfo: '',
        interest: '',
        acceptPictures: false,
        acceptTerms: false
    }

}

export default function useForm() {

    const [values, setValues] = useState(initialFieldValues);
    let {id} = useParams();
    useEffect(() => {
        if (id) {
            Axios.get(
                `https://europe-west1-loppem-adf69.cloudfunctions.net/inscriptionSaveGetTempInscription?id=${id}`
            ).then(res => {
                setValues(res.data);
                values.id = id;
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    const handleInputChange = event => {
        console.log(event);
        console.log(event.target);
        const {
            subject,
            name,
            value
        } = event.target;

        console.log(subject);
        console.log(name);
        console.log(value);

        if (subject) {
            setValues({
                ...values,
                [subject]: {
                    ...values[subject],
                    [name]: value
                }
            })
        } else {
            setValues({
                ...values,
                [name]: value
            })
        }
    }

    return {
        values,
        handleInputChange
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(0.6)
        }
    }
}))

export function Form(props) {
    const classes = useStyles();
    const {
        children,
        ...other
    } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

