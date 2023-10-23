import React from 'react';
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {customStyling, customStylingClasses} from "./CustomStyling";
import FormHelperText from "@mui/material/FormHelperText";


function CustomCheckbox(props) {
  const {subject, name, label, value, onChange, error} = props;
  const classes = customStylingClasses;

  const convertToDefaultEventParameter = (subject, name, value) => ({
    target: {
      subject, name, value
    }
  })

  return (
    <FormControl {...(error && {error: true})}>
      <FormControlLabel
        control={<Checkbox
          subject={subject}
          name={name}
          checked={value}
          color={"primary"}
          onChange={(e) => onChange(convertToDefaultEventParameter(subject, name, e.target.checked))}
          classes={{root: classes.checkbox}}
        />}
        label={label}

      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>

  )
}

export default CustomCheckbox;
