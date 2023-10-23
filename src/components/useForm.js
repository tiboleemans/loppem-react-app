import React, {useEffect, useState} from 'react';
import {styled} from "@mui/system";
import {initialFieldValues} from "../pages/Inscriptions/initialFieldValues";
import {useParams} from "react-router-dom";
import {getInscription} from "../services/InscriptionService";


export default function useForm() {

  const [values, setValues] = useState(initialFieldValues);
  const {id} = useParams();
  useEffect(() => {
    if (id) {
      getInscription(id).then((inscription) => {
        inscription.id = id;
        setValues(inscription);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [id])
  const handleInputChange = (event) => {
    const {
      subject,
      name,
      value
    } = event.target;

    if (subject) {
      setValues({
        ...values,
        [subject]: {
          ...values[subject],
          [name]: value
        }
      })
    } else {
      setValues({
        ...values,
        [name]: value
      })
    }
  }

  return {
    values,
    handleInputChange
  }
};

const PREFIX = 'MyStyledForm';

const classes = {
  root: `${PREFIX}-root`
}

const StyledForm = styled('form')(({theme}) => ({
  [`&.${classes.root}`]: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(0.6)
    }
  }
}))

export function Form(props) {
  const {
    children,
    ...other
  } = props;
  return (
    <StyledForm className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </StyledForm>
  )
}

