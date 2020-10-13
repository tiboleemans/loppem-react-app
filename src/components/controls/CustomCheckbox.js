import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function CustomCheckbox(props) {

    const {name, label, value, onChange} = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<Checkbox
                    name={name}
                    color={"primary"}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParameter(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}

export default CustomCheckbox;
