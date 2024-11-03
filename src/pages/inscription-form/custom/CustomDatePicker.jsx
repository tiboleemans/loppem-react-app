import React, {useMemo, useState} from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import nlLocale from "date-fns/locale/nl-BE";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";


const StyledDatePicker = styled(DatePicker)(({theme}) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
      color: "#fff"
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
      color: "#fff"
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      color: "#fff"
    },
  },
  '& MuiPickersToolbar-toolbar': {
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  },
  '& .MuiPickersYear-yearButton': {
    '&.Mui-selected': {
      color: "#fff"
    }
  }
}));

function CustomDatePicker(props) {
  const {subject, name, label, value, onChange, minDate, maxDate, error = null, onError} = props;
  const [errorDatePicker, setErrorDatePicker] = useState(null);
  const {t} = useTranslation();


  const errorMessage = useMemo(() => {
        if (error) {
          return error;
        }
        if (subject === 'student') {
          switch (errorDatePicker) {
            case 'maxDate':
              return t("inscription.student.error.datepicker.max.date");
            case 'minDate':
              if (name === 'birthdateAttestation') {
                return t("attestation.student.error.datepicker.min.date");
              }
              return t("inscription.student.error.datepicker.min.date");
            case 'disableFuture':
              return t("inscription.student.error.datepicker.max.date");
            case 'invalidDate': {
              return t("inscription.student.error.datepicker.invalid.date");
            }
            default: {
              return errorDatePicker;
            }
          }
        } else {
          switch (errorDatePicker) {
            case 'maxDate':
              return t("jobs.volunteer.error.datepicker.max.date");
            case 'minDate':
              return t("jobs.volunteer.error.datepicker.min.date");
            case 'disableFuture':
              return t("jobs.volunteer.error.datepicker.max.date");
            case 'invalidDate': {
              return t("jobs.volunteer.error.datepicker.invalid.date");
            }
            default: {
              return errorDatePicker;
            }
          }
        }
      }
      ,
      [errorDatePicker, value, error]
    )
  ;

  const handleChange = (dateValue) => {
    onChange(convertToDefaultEventParameter(subject, name, dateValue, error));
  };

  const handleError = (newError) => {
    if (!onError) {
      return;
    }
    setErrorDatePicker(newError);
    onError(convertToDefaultEventParameter(subject, "datepicker", value, newError));
  };

  const convertToDefaultEventParameter = (subject, name, value, error) => ({

    target: {
      subject, name, value, error: error
    }
  })

  return (
    <LocalizationProvider adapterLocale={nlLocale} dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        views={['year', 'month', 'day']}
        subject={subject}
        label={label}
        name={name}
        onChange={(date) => handleChange(date)}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        autoOk={true}
        inputVariant="outlined"
        orientation="landscape"
        onError={(newError) => handleError(newError)}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: !!errorMessage,
            helperText: errorMessage
          }
        }}
      />

    </LocalizationProvider>
  );
}


export default CustomDatePicker;
