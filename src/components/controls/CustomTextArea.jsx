import React from 'react';
import TextField from "@mui/material/TextField";
import {styled} from "@mui/system";

const PREFIX = 'MyCustomTextArea';

const classes = {
  root: `${PREFIX}-root`
}


const StyledCustomTextField = styled(TextField)(({theme}) => ({
    [`&.${classes.root}`]: {
      '& label.Mui-focused': {
        color: '#f5a034',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        // '& fieldset': {
        //     borderColor: '#f5a034',
        // },
        '&:hover fieldset': {
          borderColor: '#f5a034',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f5a034',
        },
      },
    }
  })
)


const CustomTextArea = (props) => {
  const {subject, name, label, value, onChange, type, placeholder, helperText} = props;

  const handleChange = (event) => {
    event.preventDefault();
    event.target = {subject: subject, name: name, value: event.target.value};
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
      classes={{root: classes.root}}
      multiline
      rows={4}
    />
  );
};

export default CustomTextArea;
