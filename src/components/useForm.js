import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {updateStudent} from "../services/InscriptionService";

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
            updateStudent(id, values).then((inscription) => {
                setValues(inscription);
                values.id = id;
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    const handleInputChange = event => {
        const {
            subject,
            name,
            value
        } = event.target;

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

