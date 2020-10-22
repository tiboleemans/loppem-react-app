import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {customStyling} from "./CustomStyling";


function CustomCheckbox(props) {
    const {name, label, value, onChange} = props;
    const classes = customStyling();

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
                    checked={value}
                    color={"#f5a034"}
                    onChange={e => onChange(convertToDefaultEventParameter(name, e.target.checked))}
                    classes={{root: classes.root}}
                />}
                label={label}
            />
        </FormControl>
    )
}

export default CustomCheckbox;
