import React from "react";
import {styled} from "@mui/system";
import {Checkbox} from "@mui/material";

const PREFIX = 'MyCheckbox';

const classes = {
  checkbox: `${PREFIX}-checkbox`,
}

const StyledCheckbox = styled(Checkbox)(({theme}) => ({
  [`&.${classes.checkbox}`]: {
    color: theme.palette.primary.main
  }
}));

const MyStyledCheckbox = (props) => {
  return (
    <StyledCheckbox classes={{root: classes.checkbox}}>
      {props.children}
    </StyledCheckbox>
  )
}

export default MyStyledCheckbox;