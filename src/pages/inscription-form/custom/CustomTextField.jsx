import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import isEmail from 'validator/lib/isEmail';
import {useTranslation} from "react-i18next";

const MyStyledCustomTextField = styled(TextField)(({theme}) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
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
  const {
    subject,
    name,
    label,
    value,
    onChange,
    type,
    placeholder,
    helperText,
    disabled = false,
    error = null,
    onError,
    showValidation = false
  } = props;

  const [componentError, setComponentError] = useState(null);

  const {t} = useTranslation();

  const handleChange = (event) => {
    event.target = {subject: subject, name: name, value: event.target.value, error: error};
    onChange(event);
    validateComponent(event.target.value)
  };

  const validateComponent = (value) => {
    if (!onError) {
      return;
    }
    if (type === 'email' && !isEmail(value)) {
      setComponentError(t("inscription.form.errors.email"));
    } else {
      setComponentError(null);
    }

    onError(convertToDefaultEventParameter(subject, name, value, componentError));
  };

  const convertToDefaultEventParameter = (subject, name, value, error) => ({
    target: {
      subject, name, value, error: error
    }
  })

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
      disabled={disabled}
      inputProps={{ maxLength: 100 }}
      {...(error && {error: true, helperText: error})}
      {...(showValidation && componentError && {error: true, helperText: componentError})}
    />
  );
};

export default CustomTextField;
