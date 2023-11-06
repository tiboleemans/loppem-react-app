import React from 'react';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {Checkbox} from "@mui/material";


function CustomCheckbox(props) {
  const {subject, name, label, value, onChange, error} = props;

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
          onChange={(e) => onChange(convertToDefaultEventParameter(subject, name, e.target.checked))}
        />}
        label={label}

      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>

  )
}

export default CustomCheckbox;
