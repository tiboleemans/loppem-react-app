import React, {useEffect, useState} from 'react';
import {styled} from "@mui/system";
import {initialFieldValues} from "./initialFieldValues";
import {useParams} from "react-router-dom";
import {getInscription} from "../../services/InscriptionService";
import {useTranslation} from "react-i18next";
import {initialErrorValues} from "./initialErrorValues";
import {initialComponentErrorValues} from "./initialComponentErrorValues";


export default function useForm(showValidation, step) {

  const {t} = useTranslation();
  const [values, setValues] = useState(initialFieldValues);
  const [componentErrors, setComponentErrors] = useState(initialComponentErrorValues);
  const [errors, setErrors] = useState(initialErrorValues);

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    errors.initiated = true;
    if (step === 0) {
      errors.student.language = values.student.language ? null : t("inscription.student.error.firstName")
      errors.student.period = values.student.period ? null : t("inscription.student.error.firstName")
      errors.student.firstNameStudent = values.student.firstNameStudent ? null : t("inscription.student.error.firstName")
      errors.student.lastNameStudent = values.student.lastNameStudent ? null : t("inscription.student.error.lastName")
      errors.student.birthday = values.student.birthday ? null : t("inscription.student.error.birthdate")
      errors.student.gender = values.student.gender ? null : t("inscription.student.error.sex")
    } else if (step === 1) {
      errors.parent.firstNameParent = values.parent.firstNameParent ? null : t("inscription.parent.error.firstName")
      errors.parent.lastNameParent = values.parent.lastNameParent ? null : t("inscription.parent.error.lastName")
      errors.parent.email = values.parent.email ? null : t("inscription.parent.error.email")
      errors.parent.relation = values.parent.relation ? null : t("inscription.parent.error.relation")
      errors.parent.street = values.parent.street ? null : t("inscription.parent.error.street")
      errors.parent.houseNr = values.parent.houseNr ? null : t("inscription.parent.error.houseNr")
      errors.parent.city = values.parent.city ? null : t("inscription.parent.error.city")
      errors.parent.zipCode = values.parent.zipCode ? null : t("inscription.parent.error.zipCode")
      errors.parent.gsm = values.parent.gsm ? null : t("inscription.parent.error.gsm")
      errors.parent.gsm2 = values.parent.gsm2 ? null : t("inscription.parent.error.gsm2")
    } else if (step === 2) {
      errors.school.nameSchool = values.school.nameSchool ? null : t("inscription.school.error.name")
      errors.school.streetSchool = values.school.streetSchool ? null : t("inscription.school.error.street")
      errors.school.houseNrSchool = values.school.houseNrSchool ? null : t("inscription.school.error.houseNr")
      errors.school.citySchool = values.school.citySchool ? null : t("inscription.school.error.city")
      errors.school.zipSchool = values.school.zipSchool ? null : t("inscription.school.error.zip")
      errors.school.titleProfSchool = values.school.titleProfSchool ? null : t("inscription.school.error.prof.title")
      errors.school.nameProfSchool = values.school.nameProfSchool ? null : t("inscription.school.error.prof.name")
      errors.school.yearsSchool = values.school.yearsSchool ? null : t("inscription.school.error.count.years")
      errors.school.hoursSchool = values.school.hoursSchool ? null : t("inscription.school.error.count.hours")
      errors.school.immersionSchool = values.school.immersionSchool ? null : t("inscription.school.error.immersion")
      errors.school.reportSchool = values.school.reportSchool ? null : t("inscription.school.error.report")
    } else if (step === 3) {
      errors.extra.contact = values.extra.contact ? null : t("inscription.extra.error.contact")
      errors.extra.acceptTerms = values.extra.acceptTerms ? null : t("inscription.extra.error.street")
    }

    setErrors({
        ...errors
      }
    )
  }, [values, showValidation]);


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
    updateValue(subject, name, value)
  }

  const updateValue = (subject, name, value) => {
    setValues({
      ...values,
      [subject]: {
        ...values[subject],
        [name]: value
      }
    })
  }

  const handleOnError = (event) => {
    const {
      subject,
      name,
      error
    } = event.target;
    updateComponentError(subject, name, error)
  }

  const updateComponentError = (subject, name, error) => {
    setComponentErrors({
      ...componentErrors,
      [subject]: {
        ...componentErrors[subject],
        [name]: error
      }
    })
  }

  return {
    values,
    handleInputChange,
    handleOnError,
    errors,
    componentErrors
  }
};


const StyledForm = styled('form')(({theme}) => ({
  '& .MuiFormControl-root': {
    width: '90%',
    margin: theme.spacing(0.6)
  }
}))

export function Form(props) {
  const {
    children,
    ...other
  } = props;
  return (
    <StyledForm autoComplete="off" {...other}>
      {props.children}
    </StyledForm>
  )
}

