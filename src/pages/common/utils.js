/* eslint-disable */
import axios from "axios";

export function scrollTo(elmID) {
  const elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    console.log("cannot find el", elmID);
    return;
  }

  window.scrollTo({behavior: "smooth", top: elm.offsetTop - 20});
}

export function hasNoErrors(errors) {
  return Object.values(errors).every((error) => error === null);
}

export function hasValues(values) {
  return Object.values(values).some((value) => value !== '' || value !== null || value)
}

export function handleError(t, error, setError, values) {
  if (axios.isAxiosError(error)) {
    if (error.toJSON().code === "ERR_NETWORK") {
      const networkError = {
        message: error.toJSON().message,
        details: t("inscription.confirmation.error.network"),
        values: error.toJSON().config.data,
      }
      setError(networkError);
    } else {
      const backendError = {
        message: error.toJSON().message,
        details: JSON.stringify(error.response?.data?.error?.details),
        values: error.toJSON().config.data,
      }
      setError(backendError);
    }
  } else {
    const validationError = {
      message: t("inscription.confirmation.error.undefined"),
      details: JSON.stringify(error),
      values: values,
    }
    setError(validationError);
  }
}

export function handleInputChange(event, setValues, values) {
  const {
    subject,
    name,
    value
  } = event.target;

  setValues({
    ...values,
    [subject]: {
      ...values[subject],
      [name]: value
    }
  })
}

export const handleComponentError = (event, setComponentErrors, componentErrors) => {
  const {
    subject,
    name,
    error
  } = event.target;
  setComponentErrors({
    ...componentErrors,
    [subject]: {
      ...componentErrors[subject],
      [name]: error
    }
  })
}

export const isFull = (period, language) => {
  if (period === "july") {
    if (language === "dutch") {
      return true;
    } else if (language === "english") {
      return true;
    } else {
      return false;
    }
  } else if (period === "august") {
    if (language === "dutch") {
      return false;
    } else if (language === "english") {
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
