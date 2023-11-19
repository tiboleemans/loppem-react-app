import React from 'react';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {Checkbox} from "@mui/material";


function CustomCheckbox(props) {
  const {subject, name, label, value, onChange, error} = props;

  const handleChange = (event) => {
    event.target = {subject: subject, name: name, value: event.target.checked, error: error};
    onChange(event);
  };

  return (
    <FormControl {...(error && {error: true})}>
      <FormControlLabel
        control={<Checkbox
          subject={subject}
          name={name}
          checked={value}
          onChange={(e) => handleChange(e)}
        />}
        label={label}

      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>

  )
}

export default CustomCheckbox;
