import React from 'react';
import TextField from "@material-ui/core/TextField";
import {customStyling} from "./CustomStyling";


const CustomTextField = (props) => {
    const {name, label, value, onChange, type, placeholder, helperText} = props;
    const classes = customStyling();

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            helperText={helperText}
            classes={{root:classes.textfield_root}}
        />
    );
};

export default CustomTextField;
