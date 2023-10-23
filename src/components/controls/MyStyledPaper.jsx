import React from "react";
import {styled} from "@mui/system";

const PREFIX = 'MyPaper';

const classes = {
  paper: `${PREFIX}-paper`,
}

const StyledPaper = styled('div')(({theme}) => ({
  [`&.${classes.paper}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const MyStyledPaper = (props) => {
  return (
    <StyledPaper className={classes.paper}>
      {props.children}
    </StyledPaper>
  )
}

export default MyStyledPaper