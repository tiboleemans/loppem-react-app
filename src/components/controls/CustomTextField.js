import React from 'react';
import TextField from "@material-ui/core/TextField";
import {customStyling} from "./CustomStyling";


const CustomTextField = (props) => {
    const {subject, name, label, value, onChange, type, placeholder, helperText, error = null} = props;
    const classes = customStyling();

    const handleChange = (event) => {
        event.preventDefault();
        event.target = {subject: subject, name: name, value: event.target.value};
        onChange(event);
    };

    return (
        <TextField
            variant="outlined"
            label={label}
            subject={subject}
            name={name}
            value={value}
            onChange={(e) => handleChange(e)}
            type={type}
            placeholder={placeholder}
            helperText={helperText}
            classes={{root:classes.textfield_root}}
            {...(error && {error:true, helperText:error})}
        />
    );
};

export default CustomTextField;
