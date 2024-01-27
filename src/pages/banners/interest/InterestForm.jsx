import * as React from 'react';
import {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import {Form} from "../../inscription-form/useForm";
import CustomTextField from "../../inscription-form/custom/CustomTextField";
import CustomTextArea from "../../inscription-form/custom/CustomTextArea";
import {sendInterestMail} from "../../../services/MailService";
import {handleComponentError, handleError, handleInputChange, hasNoErrors, hasValues} from "../../common/utils";
import {getLanguage} from "../../../i18n/i18nSetup";
import {initComponentErrors, initErrors, initValues} from "./initInterest";
import {CircularProgress} from "@mui/material";

export default function InterestForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [componentErrors, setComponentErrors] = useState(initComponentErrors);


  function getMailContent() {
    const greeting = t("banner.interest.form.dialog.mail.greeting") + " " + `${values.friend.name}` + "\n\n";
    const body = t("banner.interest.form.dialog.mail.body") + "\n\n";

    const footer = t("banner.interest.form.dialog.mail.footer") + "\n\n" + `${values.parent.name}`;
    if (values.friend.content) {
      const personalMessage = values.friend.content + "\n\n";
      return greeting + personalMessage + body + footer;
    }

    return greeting + body + footer;
  }

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    updateErrors();
  }, [values, showValidation]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClear = () => {
    setShowValidation(false);
    setValues(initValues);
    setErrors(initErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleAnother = () => {
    setShowValidation(false);
    values.friend.name = '';
    values.friend.email = '';
    setErrors(initErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleClose = () => {
    setOpen(false);
    handleClear();
  };

  const handleRetry = () => {
    setShowValidation(true);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      values.parent.language = getLanguage();
      sendInterestMail(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  function updateErrors() {
    errors.parent.name = values.parent.name ? null : t("banner.interest.form.parent.error.name");
    errors.parent.email = values.parent.email ? null : t("banner.interest.form.parent.error.email");
    errors.friend.name = values.friend.name ? null : t("banner.interest.form.friend.error.name");
    errors.friend.email = values.friend.email ? null : t("banner.interest.form.friend.error.email");
    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasValues(values.parent) && hasNoErrors(errors.parent) && hasNoErrors(componentErrors.parent) &&
      hasValues(values.friend) && hasNoErrors(errors.friend) && hasNoErrors(componentErrors.friend);
  }

  function getDialogTitle() {
    if (isLoading) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.loading")}</DialogTitle>;
    }
    if (!!axiosResult) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.success")}</DialogTitle>;
    }
    if (!!axiosError) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.error")}</DialogTitle>;
    }
    return <DialogTitle>{t("banner.interest.form.dialog.title.normal")}</DialogTitle>;
  }

  function getDialogContentText() {
    if (isLoading) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.loading")}</DialogContentText>;
    }
    if (!!axiosResult) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.success")}</DialogContentText>;
    }
    if (!!axiosError) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.error")}</DialogContentText>;
    }
    return <DialogContentText>{t("banner.interest.form.dialog.subtitle.normal")}</DialogContentText>;
  }

  function getLeftButton() {
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.interest.form.dialog.action.back")}
      </div>;
    }
    if (!!axiosError) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.interest.form.dialog.action.cancel")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleClose}>
      {t("banner.interest.form.dialog.action.cancel")}
    </div>;
  }

  function getRightButton() {
    if (isLoading) {
      return <div className="banner-circular-spinner"><CircularProgress size={50}/> </div>
    }
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleAnother}>
        {t("banner.interest.form.dialog.action.another")}
      </div>;
    }
    if (!!axiosError) {
      return <div className="banner-button-dialog" onClick={handleRetry}>
        {t("banner.interest.form.dialog.action.retry")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleSend}>
      {t("banner.interest.form.dialog.action.send")}
    </div>;
  }

  return (
    <>
      <div className="banner-button" onClick={handleClickOpen}>
        {t("banner.interest.button.send")}
      </div>
      <Dialog open={open} onClose={handleClose}>
        {getDialogTitle()}
        <DialogContent>
          {getDialogContentText()}
          <div className="section-header">
            <h3>{t("banner.interest.form.dialog.section.1.header")}</h3>
          </div>
          <Form>
            <CustomTextField
              subject={"parent"}
              label={t("banner.interest.form.dialog.section.1.text.field.1")}
              name="name"
              value={values.parent.name}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.name}
            />

            <CustomTextField
              subject={"parent"}
              label={t("banner.interest.form.dialog.section.1.text.field.2")}
              name="email"
              type="email"
              value={values.parent.email}
              onChange={(e) => handleInputChange(e, setValues, values)}
              onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
              showValidation={showValidation}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.email}
            />

            <div className="section-header">
              <h3>{t("banner.interest.form.dialog.section.2.header")}</h3>
            </div>
            <CustomTextField
              subject={"friend"}
              label={t("banner.interest.form.dialog.section.2.text.field.1")}
              name="name"
              value={values.friend.name}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.friend.name}
            />
            <CustomTextField
              subject={"friend"}
              label={t("banner.interest.form.dialog.section.2.text.field.2")}
              name="email"
              type="email"
              value={values.friend.email}
              onChange={(e) => handleInputChange(e, setValues, values)}
              onError={(e) => handleComponentError(e, setComponentErrors, componentErrors)}
              showValidation={showValidation}
              disabled={!!axiosResult || !!axiosError}
              error={errors.friend.email}
            />
            <CustomTextArea
              subject={"friend"}
              label={t("banner.interest.form.dialog.section.2.text.field.3")}
              name="content"
              value={values.friend.content}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.friend.content}
            />
            <CustomTextArea
              label={t("banner.interest.form.dialog.section.2.text.field.4")}
              value={getMailContent()}
              disabled={true}
            />

          </Form>
        </DialogContent>
        <DialogActions className="dialog-actions">
          {getLeftButton()}
          {getRightButton()}
        </DialogActions>
      </Dialog>
    </>
  );
}
