import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {customStyling} from "./CustomStyling";
import FormHelperText from "@material-ui/core/FormHelperText";


function CustomCheckbox(props) {
    const {name, label, value, onChange, error} = props;
    const classes = customStyling();

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl {...(error && {error:true})}>
            <FormControlLabel
                control={<Checkbox
                    name={name}
                    checked={value}
                    // color={"primary"}
                    onChange={e => onChange(convertToDefaultEventParameter(name, e.target.checked))}
                    classes={{root: classes.checkbox}}
                />}
                label={label}

            />
            <FormHelperText>{error}</FormHelperText>
        </FormControl>

    )
}

export default CustomCheckbox;
