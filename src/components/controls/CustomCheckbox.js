import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {customStyling} from "./CustomStyling";
import FormHelperText from "@material-ui/core/FormHelperText";


function CustomCheckbox(props) {
    const {subject, name, label, value, onChange, error} = props;
    const classes = customStyling();

    const convertToDefaultEventParameter = (subject, name, value) => ({
        target: {
            subject, name, value
        }
    })

    return (
        <FormControl {...(error && {error:true})}>
            <FormControlLabel
                control={<Checkbox
                    subject={subject}
                    name={name}
                    checked={value}
                    color={"primary"}
                    onChange={e => onChange(convertToDefaultEventParameter(subject, name, e.target.checked))}
                    classes={{root: classes.checkbox}}
                />}
                label={label}

            />
            <FormHelperText>{error}</FormHelperText>
        </FormControl>

    )
}

export default CustomCheckbox;
