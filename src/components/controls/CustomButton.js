import React from 'react';
import Button from "@material-ui/core/Button";

function CustomButton(props) {

    const {text, size, color, variant, onClick, ...other} = props

    return (
        <Button
            variant={variant || "contained"}
            size={size || "medium"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
