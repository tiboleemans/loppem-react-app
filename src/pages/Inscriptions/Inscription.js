import React from 'react';
import StepOneForm from "./StepOneForm";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import InscriptionForm from "./InscripionForm";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(10),
        padding: theme.spacing(6),
        // width: '60%'
    }
}))

export default function Inscription() {
    const classes = useStyles();
    return (
        <>
            <InscriptionForm/>
        </>
    )
}
