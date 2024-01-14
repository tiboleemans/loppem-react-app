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
import {initialQuestionValues} from "./initialQuestionValues";
import {initialQuestionErrors} from "./initialQuestionErrors";
import CustomTextArea from "../../inscription-form/custom/CustomTextArea";
import {sendQuestionMail} from "../../../services/MailService";
import {handleError, handleInputChange, hasNoErrors, hasValues} from "../../common/utils";

export default function QuestionForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initialQuestionValues);
  const [errors, setErrors] = useState(initialQuestionErrors);

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
    setValues(initialQuestionValues);
    setErrors(initialQuestionErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      values.parent.subject = t("banner.question.form.dialog.mail.subject");
      sendQuestionMail(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  function updateErrors() {
    errors.parent.name = values.parent.name ? null : t("banner.question.form.parent.error.name");
    errors.parent.email = values.parent.email ? null : t("banner.question.form.parent.error.email");
    errors.parent.content = values.parent.content ? null : t("banner.question.form.parent.error.email");

    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasNoErrors(errors.parent) && hasValues(values.parent);
  }

  function getDialogTitle() {
    if (isLoading) {
      return <DialogTitle>{t("banner.question.form.dialog.title.loading")}</DialogTitle>;
    }
    if (!!axiosResult) {
      return <DialogTitle>{t("banner.question.form.dialog.title.success")}</DialogTitle>;
    }
    if (!!axiosError) {
      return <DialogTitle>{t("banner.question.form.dialog.title.error")}</DialogTitle>;
    }
    return <DialogTitle>{t("banner.question.form.dialog.title.normal")}</DialogTitle>;
  }

  function getDialogContentText() {
    if (isLoading) {
      return <DialogContentText>{t("banner.question.form.dialog.subtitle.loading")}</DialogContentText>;
    }
    if (!!axiosResult) {
      return <DialogContentText>{t("banner.question.form.dialog.subtitle.success")}</DialogContentText>;
    }
    if (!!axiosError) {
      return <DialogContentText>{t("banner.question.form.dialog.subtitle.error")}</DialogContentText>;
    }
    return <DialogContentText>{t("banner.question.form.dialog.subtitle.normal")}</DialogContentText>;
  }

  function getLeftButton() {
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.question.form.dialog.action.back")}
      </div>;
    }
    if (!!axiosError) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.question.form.dialog.action.cancel")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleClose}>
      {t("banner.question.form.dialog.action.cancel")}
    </div>;
  }

  function getRightButton() {
    if (isLoading) {
      return <div className="banner-button-dialog">
        {t("banner.question.form.dialog.action.send")}
      </div>;
    }
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleClear}>
        {t("banner.question.form.dialog.action.another")}
      </div>;
    }
    if (!!axiosError) {
      return <div className="banner-button-dialog" onClick={handleSend}>
        {t("banner.question.form.dialog.action.retry")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleSend}>
      {t("banner.question.form.dialog.action.send")}
    </div>;
  }

  return (
    <>
      <div className="banner-button" onClick={handleClickOpen}>
        {t("banner.question.button")}
      </div>
      <Dialog open={open} onClose={handleClose}>
        {getDialogTitle()}
        <DialogContent>
          {getDialogContentText()}
          <div className="section-header">
            <h3>{t("banner.question.form.dialog.section.1.header")}</h3>
          </div>
          <Form>
            <CustomTextField
              subject={"parent"}
              label={t("banner.question.form.dialog.section.1.text.field.1")}
              name="name"
              value={values.parent.name}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.name}
            />

            <CustomTextField
              subject={"parent"}
              label={t("banner.question.form.dialog.section.1.text.field.2")}
              name="email"
              value={values.parent.email}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.email}
            />

            <div className="section-header">
              <h3>{t("banner.question.form.dialog.section.2.header")}</h3>
            </div>
            <CustomTextArea
              subject={"parent"}
              label={t("banner.question.form.dialog.section.2.text.field.3")}
              name="content"
              value={values.parent.content}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.content}
            />
          </Form>
        </DialogContent>
        <DialogActions>
          {getLeftButton()}
          {getRightButton()}
        </DialogActions>
      </Dialog>
    </>
  );
}
