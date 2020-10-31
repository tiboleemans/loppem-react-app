import {makeStyles} from "@material-ui/core/styles";

const customColors = {
    primaryColor: '#3f5659',
    // primaryColor: '#f5a034',
};


const customStyling = makeStyles(theme => ({

    root: {
        color: customColors.primaryColor,
    },
    textfield_root: {
        '& label.Mui-focused': {
            color: customColors.primaryColor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //     borderColor: customColors.primaryColor,
            // },
            '&:hover fieldset': {
                borderColor: customColors.primaryColor,
            },
            '&.Mui-focused fieldset': {
                borderColor: customColors.primaryColor,
            },
        },
        '& MuiPickersToolbar-toolbar': {
            backgroundColor: customColors.primaryColor,
        }
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        '& .MuiStepIcon-active': {
            color: customColors.primaryColor,
        },
        '& .MuiStepIcon-completed': {
            color: customColors.primaryColor,
        }

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: '#000',
        '& .MuiButton-containedPrimary': {
            color: 'white',
            '&:hover': {
                background: '#f5a034'
            }
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    checkbox: {
        // color: "primary",
        '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: customColors.primaryColor,
        },
    }
}))

const customButtonGroupStyling = {
    color: 'white',
    variant: 'contained',
    backgroundColor: customColors.primaryColor,
}

export {customStyling, customButtonGroupStyling};

