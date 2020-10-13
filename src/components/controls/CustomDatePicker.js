import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

function CustomDatePicker(props) {

    const {name, label, value, onChange} = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                views={["year", "month", "date"]}
                label={label}
                name={name}
                onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                value={value}
                minDate={new Date("2003-01-01")}
                maxDate={new Date("2012-01-01")}
                autoOk={true}
                inputVariant="outlined"
                orientation="landscape"
            />
        </MuiPickersUtilsProvider>
    );
}

export default CustomDatePicker;
