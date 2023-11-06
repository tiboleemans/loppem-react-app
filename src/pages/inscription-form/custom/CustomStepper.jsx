import {styled} from "@mui/system";
import React from "react";
import Stepper from '@mui/material/Stepper';

const StyledStepper = styled(Stepper)(({theme}) => ({
  '& MuiStepIcon-text': {
    color: theme.palette.secondary.main,
  }
}));

const CustomStepper = (props) => {
  return (
    <StyledStepper className="inscription-stepper" activeStep={props.activeStep}>
      {props.children}
    </StyledStepper>
  )
}

export default CustomStepper;