import React, {useEffect, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {styled} from "@mui/system";

function CustomSelect(props) {

  const StyledCustomSelect = styled(Select)(({theme}) => ({
      '&>.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiSelect-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiSelect-select': {
        color: theme.palette.primary.main,
      },
      '& .MuiSelect-outlined:hover': {
        borderColor: theme.palette.primary.main,
      },
    })
  )

  const {subject, name, labelId, labelText, value, onChange, items, error = null} = props;

  const handleChange = (event) => {
    event.target = {subject: subject, name: name, value: event.target.value, error: error};
    onChange(event);
  };

  return (
    <FormControl {...(error && {error: true})}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <StyledCustomSelect
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
      </StyledCustomSelect>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default CustomSelect;
