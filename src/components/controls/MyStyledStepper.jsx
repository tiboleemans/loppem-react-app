import {styled} from "@mui/system";
import React from "react";
import Stepper from '@mui/material/Stepper';

const PREFIX = 'MyStepper';

const classes = {
  stepper: `${PREFIX}-stepper`,
}

const customColors = {
  primaryColor: '#F49B05',
  secondaryColor: '#9DC982'
};

const StyledStepper = styled(Stepper)(({theme}) => ({
  [`&.${classes.stepper}`]: {
    padding: theme.spacing(3, 0, 5),
    '& .MuiStepIcon-active': {
      color: customColors.primaryColor,
    },
    '& .MuiStepIcon-completed': {
      color: customColors.primaryColor,
    }
  },
}));

const MyStyledStepper = (props) => {
  return (
    <StyledStepper className={classes.stepper}>
      {props.children}
    </StyledStepper>
  )
}

export default MyStyledStepper;