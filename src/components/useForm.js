import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";

export default function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("name:" + name + " and value:" + value);
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
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
    return (
        <form className={classes.root} autoComplete="off">
            {props.children}
        </form>
    )
}

