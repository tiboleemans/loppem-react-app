import React from 'react';
import {styled} from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

const PREFIX = 'MyCustomCard';

const classes = {
  top: `${PREFIX}-top`
}

const StyledCustomCard = styled('div')(({theme}) => ({
  [`&.${classes.top}`]: {
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    textAlign: "justify",
    color: "#000",
    padding: "20px",
    boxShadow: "5px 5px 5px 0px rgba(194,194,194,1)",
  }
}))

function CustomCard(props) {

  const {title, subheader} = props;

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader || ""}
        classes={{content: classes.top}}
      />
    </Card>
  );
}

export default CustomCard;
