import {styled} from "@mui/system";
import React from "react";
import Stepper from '@mui/material/Stepper';

const PREFIX = 'MyStepper';

const classes = {
  stepper: `${PREFIX}-stepper`,
}

const StyledStepper = styled(Stepper)(({theme}) => ({
  [`&.${classes.stepper}`]: {
    padding: theme.spacing(0, 0, 5),
  },
}));

const MyStyledStepper = (props) => {
  return (
    <StyledStepper className={classes.stepper} activeStep={props.activeStep}>
      {props.children}
    </StyledStepper>
  )
}

export default MyStyledStepper;