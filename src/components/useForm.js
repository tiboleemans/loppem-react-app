import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";

export default function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        })
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
    const { children, ...other} = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

