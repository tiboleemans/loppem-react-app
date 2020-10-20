import React from 'react';
import TextField from "@material-ui/core/TextField";

const CustomInput = (props) => {
    const {name, label, value, onChange} = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
};

export default CustomInput;
