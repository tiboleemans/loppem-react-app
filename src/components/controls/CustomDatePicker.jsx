import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import nlLocale from "date-fns/locale/nl-BE";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {styled} from "@mui/material/styles";

function CustomDatePicker(props) {

  const PREFIX = 'MyDatePicker';

  const classes = {
    textfield_root: `${PREFIX}-textfield_root`,
  }

  const StyledDatePicker = styled(DatePicker)(({theme}) => ({
    [`&.${classes.textfield_root}`]: {
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
      '& MuiPickersToolbar-toolbar': {
        backgroundColor: theme.palette.primary.main,
      },
      '& Mui-selected': {
        color: "#fff"
      }
    },
  }))

  const {subject, name, label, value, onChange, error = null} = props;

  const convertToDefaultEventParameter = (subject, name, value) => ({
    target: {
      subject, name, value
    }
  })

  const minDate = new Date((new Date().getFullYear() - 20) + "-01-01");
  const maxDate = new Date((new Date().getFullYear() - 9) + "-01-01");

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
        // onChange={(date) => onChange(convertToDefaultEventParameter(subject, name, date))}
        // value={value}
        minDate={minDate}
        minDateMessage={"minDateMessage"}
        maxDate={maxDate}
        maxDateMessage={"maxDateMessage"}
        autoOk={true}
        inputVariant="outlined"
        orientation="landscape"
        classes={{root: classes.textfield_root}}
        {...(error && {error: true, helperText: error})}
      />

    </LocalizationProvider>
  );
}


export default CustomDatePicker;
