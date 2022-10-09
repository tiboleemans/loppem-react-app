import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {customStyling} from "./CustomStyling";
import nlLocale from "date-fns/locale/nl-BE";

function CustomDatePicker(props) {

    const classes = customStyling();

    const {subject, name, label, value, onChange, error = null} = props;

    const convertToDefaultEventParameter = (subject,name, value) => ({
        target: {
            subject, name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={nlLocale}>
            <KeyboardDatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                views={["year", "month", "date"]}
                subject={subject}
                label={label}
                name={name}
                onChange={date => onChange(convertToDefaultEventParameter(subject, name, date))}
                value={value}
                minDate={new Date("2003-01-01")}
                minDateMessage={"minDateMessage"}
                maxDate={new Date("2012-01-01")}
                maxDateMessage={"maxDateMessage"}
                autoOk={true}
                inputVariant="outlined"
                orientation="landscape"
                classes={{root:classes.textfield_root}}
                {...(error && {error:true, helperText:error})}
            />
        </MuiPickersUtilsProvider>
    );
}

export default CustomDatePicker;
