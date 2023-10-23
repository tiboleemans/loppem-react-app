import {styled} from "@mui/system";
import Paper from '@mui/material/Paper';

const PREFIX = 'customStyling';

const customStylingClasses = {
  root: `${PREFIX}-root`,
  textfield_root: `${PREFIX}-textfield_root`,
  layout: `${PREFIX}-layout`,
  paper: `${PREFIX}-paper`,
  stepper: `${PREFIX}-stepper`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  checkbox: `${PREFIX}-checkbox`,
}

const customColors = {
  primaryColor: '#F49B05',
  secondaryColor: '#9DC982'
};

const customStyling = styled('div', (theme) => ({
  [`&.${customStylingClasses.root}`]: {
    color: customColors.primaryColor,
  },
  [`&.${customStylingClasses.layout}`]: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  [`&.${customStylingClasses.buttons}`]: {
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
  [`&.${customStylingClasses.button}`]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  [`&.${customStylingClasses.checkbox}`]: {
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

export {customStyling, customButtonGroupStyling, customStylingClasses};

