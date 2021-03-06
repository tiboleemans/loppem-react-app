import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
        root: {
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
    const {name, label, value, onChange, type, placeholder, helperText} = props;
    const classes = useStyles();

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            helperText={helperText}
            classes={{root:classes.root}}
            multiline
            rows={4}
        />
    );
};

export default CustomTextArea;
