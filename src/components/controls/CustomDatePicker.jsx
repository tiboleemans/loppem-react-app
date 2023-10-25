import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import nlLocale from "date-fns/locale/nl-BE";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {styled} from "@mui/system";

function CustomDatePicker(props) {

  const PREFIX = 'MyDatePicker';

  const classes = {
    textfield_root: `${PREFIX}-textfield_root`,
  }

  const customColors = {
    primaryColor: '#F49B05',
    secondaryColor: '#9DC982'
  };
  // const StyledDatePicker = styled(DatePicker)(({theme}) => ({
  //   [`&.${classes.textfield_root}`]: {
  //     '& label.Mui-focused': {
  //       color: customColors.primaryColor,
  //     },
  //     '& .MuiInput-underline:after': {
  //       borderBottomColor: 'black',
  //     },
  //     '& .MuiOutlinedInput-root': {
  //       // '& fieldset': {
  //       //     borderColor: customColors.primaryColor,
  //       // },
  //       '&:hover fieldset': {
  //         borderColor: customColors.primaryColor,
  //       },
  //       '&.Mui-focused fieldset': {
  //         borderColor: customColors.primaryColor,
  //       },
  //     },
  //     '& MuiPickersToolbar-toolbar': {
  //       backgroundColor: customColors.primaryColor,
  //     }
  //   },
  // }))

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
      <DatePicker
        disableFuture
        openTo="year"
        inputFormat="dd/MM/yyyy"
        views={["year", "month", "day"]}
        subject={subject}
        label={label}
        name={name}
        onChange={(date) => onChange(convertToDefaultEventParameter(subject, name, date))}
        value={value}
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
