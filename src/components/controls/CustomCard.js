import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
    top: {
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        textAlign: "justify",
        color: "#000",
        padding: "20px",
        boxShadow: "5px 5px 5px 0px rgba(194,194,194,1)",
    }
}))

function CustomCard(props) {

    const classes = useStyles();

    const {title, subheader} = props;

    return (
            <CardHeader
                title={title}
                subheader={subheader || ""}
                classes={{ content: classes.top }}
            />
    );
}

export default CustomCard;
