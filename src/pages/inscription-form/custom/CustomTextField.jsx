import React from 'react';
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";

const MyStyledCustomTextField = styled(TextField)(({theme}) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    // '& fieldset': {
    //     borderColor: customColors.primaryColor,
    // },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& MuiPickersToolbar-toolbar': {
    backgroundColor: theme.palette.primary.main,
  }
}))


const CustomTextField = (props) => {
  const {subject, name, label, value, onChange, type, placeholder, helperText, error = null} = props;

  const handleChange = (event) => {
    event.target = {subject: subject, name: name, value: event.target.value, error: error};
    onChange(event);
  };

  return (
    <MyStyledCustomTextField
      variant="outlined"
      label={label}
      subject={subject}
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      type={type}
      placeholder={placeholder}
      helperText={helperText}
      {...(error && {error: true, helperText: error})}
    />
  );
};

export default CustomTextField;
