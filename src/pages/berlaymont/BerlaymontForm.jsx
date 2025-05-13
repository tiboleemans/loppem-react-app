import React, {useEffect, useState} from "react";
import {Card} from "@mui/material";
import CustomTextField from "../inscription-form/custom/CustomTextField";
import {Form} from "../inscription-form/useForm";
import {useTranslation} from "react-i18next";
import {initComponentErrors, initErrors, initValues} from "./initBerlaymont";
import {handleComponentError, handleError, handleInputChange, hasNoErrors, hasValues} from "../common/utils";
import "./berlaymont.css";
import {getLanguage} from "../../i18n/i18nSetup";
import ApplyConfirmation from "./ApplyConfirmation";
import {sendCodeMail, sendInterestMail} from "../../services/MailService";

const BerlaymontForm = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [componentErrors, setComponentErrors] = useState(initComponentErrors);

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    updateErrors();
  }, [values, showValidation]);

  useEffect(() => {
    values.friend.code = generateCode(8);
  }, []);

  function generateCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return "BERLAYMONT2025-".concat(result);
  }

  const handleAnother = () => {
    setShowValidation(false);
    values.friend.email = '';
    values.friend.code = generateCode(8);
    setErrors(initErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    values.friend.language = getLanguage();
    if (canSend()) {
      setIsLoading(true);
      sendCodeMail(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  function updateErrors() {
    errors.friend.email = values.friend.email ? null : t("banner.interest.form.friend.error.email");
    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasValues(values.friend) && hasNoErrors(errors.friend) && hasNoErrors(componentErrors.friend);
  }

  function showConfirmation() {
    return isLoading || axiosResult || axiosError;
  }

  return (
    <div className="section" id="berlaymont">
      <div className="container">
        <Card className="card-container">
          <h1>{t("berlaymont.title")}</h1>
          {showConfirmation() ? (
            <>
              <ApplyConfirmation isLoading={isLoading} registration={axiosResult} error={axiosError} retry={handleAnother}/>
            </>
          ) : (
            <>
              <Form>
                <CustomTextField
                  subject={"friend"}
                  label={t("berlaymont.form.section.1.text.field.1")}
                  name="email"
                  type="email"
                  value={values.friend.email}
                  onChange={(e) => handleInputChange(e, setValues, values)}
                  onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
                  showValidation={showValidation}
                  disabled={!!axiosResult || !!axiosError}
                  error={errors.friend.email}
                />
                <CustomTextField
                  subject={"friend"}
                  label={t("berlaymont.form.section.1.text.field.2")}
                  name="code"
                  value={values.friend.code}
                  onChange={(e) => handleInputChange(e, setValues, values)}
                  disabled={true}
                  error={errors.friend.code}
                />

              </Form>

              <div className="flex-container">
                <div className="berlaymont-button" onClick={handleSend}>
                  {t("berlaymont.button.send")}
                </div>
              </div>
            </>
          )}
        < /Card>
      </div>
    </div>
  );
};

export default BerlaymontForm;
