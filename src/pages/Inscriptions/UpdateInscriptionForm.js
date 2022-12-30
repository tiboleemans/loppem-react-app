import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {customStyling} from "../../components/controls/CustomStyling";
import useForm from "../../components/useForm";
import StudentInformationForm from "./StudentInformationForm";
import {Button} from "@mui/material";
import Alert from "@mui/material/Alert";
import {getLanguage} from "../../i18n/i18nSetup";
import {getInscription, registerStudent, updateStudent} from "../../services/InscriptionService";
import {useParams} from "react-router-dom";


export default function UpdateInscriptionForm() {
    const classes = customStyling();
    const {
        values,
        handleInputChange
    } = useForm();

    const [errors, setErrors] = useState({});

    function getContent(){
        return <StudentInformationForm values={values} handleInputChange={handleInputChange} errors={errors}/>;
    }

    const sentInfo = () => {
        // setIsLoading(true);
        // values.parent.siteLanguage = getLanguage();
        const update = updateStudent(values.id, values);
        // setIsLoading(false)
    }


    return (
        <React.Fragment>
            <div className="section bg-light-gray" id="inscription">
                <div className="container">
                    <Paper className={classes.paper}>
                        <div className="section__header">
                            <h2>Inschrijvingsformulier</h2>
                        </div>
                        <React.Fragment>
                            {getContent()}
                            <Button
                                variant="contained"
                                onClick={sentInfo}
                                className={classes.button}
                                color="primary"
                            > Update </Button>
                        </React.Fragment>
                    </Paper>
                </div>
            </div>
        </React.Fragment>
    );
}