import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

function CustomButton(props) {

    const {text, size, color, variant, onClick, ...other} = props
    const classes = useStyles();


    return (
        <Button
            variant={variant || "contained"}
            size={size || "medium"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{root:classes.root, label:classes.label}}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
