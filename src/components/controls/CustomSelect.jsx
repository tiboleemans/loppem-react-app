import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

function CustomSelect(props) {

  const {subject, name, labelId, labelText, value, onChange, items, error} = props;

  const handleChange = (event) => {
    event.preventDefault();
    event.target = {subject: subject, name: name, value: event.target.value};
    onChange(event);
  };

  return (

    <FormControl variant="outlined" {...(error && {error: true})}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        subject={subject}
        labelId={labelId}
        id={name}
        name={name}
        value={value}
        label={labelText}
        onChange={(e) => handleChange(e)}
      >

        {
          items.map(
            (item, index) => (
              <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
            )
          )
        }
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default CustomSelect;
