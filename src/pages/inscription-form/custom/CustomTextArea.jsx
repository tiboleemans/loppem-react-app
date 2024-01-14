import React from 'react';
import TextField from "@mui/material/TextField";
import {styled} from "@mui/system";


const StyledCustomTextField = styled(TextField)(({theme}) => ({
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  })
)


const CustomTextArea = (props) => {
  const {subject, name, label, value, onChange, type, placeholder, helperText, disabled = false, error = null} = props;

  const handleChange = (event) => {
    event.target = {subject: subject, name: name, value: event.target.value, error: error};
    onChange(event);
  };

  return (
    <StyledCustomTextField
      variant="outlined"
      subject={subject}
      label={label}
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      type={type}
      placeholder={placeholder}
      helperText={helperText}
      multiline
      rows={4}
      disabled={disabled}
    />
  );
};

export default CustomTextArea;
