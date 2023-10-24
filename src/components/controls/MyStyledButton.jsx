import React from "react";
import {styled} from "@mui/system";
import {Button} from "@mui/material";

const PREFIX = 'MyButton';

const classes = {
  button: `${PREFIX}-button`,
  buttons: `${PREFIX}-buttons`,
}

const StyledButtons = styled('div')(({theme}) => ({
  [`&.${classes.buttons}`]: {
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
}));

const StyledButton = styled(Button)(({theme}) => ({
  [`&.${classes.button}`]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const MyStyledButton = (props) => {
  return (
    <StyledButton className={classes.button} onClick={props.onClick} variant={props.variant}>
      {props.children}
    </StyledButton>
  )
}

const MyStyledButtons = (props) => {
  return (
    <StyledButtons className={classes.buttons}>
      {props.children}
    </StyledButtons>
  )
}

export {MyStyledButtons, MyStyledButton}