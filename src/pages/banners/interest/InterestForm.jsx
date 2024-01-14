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
import axios from "axios";
import {initialInterestValues} from "./initialInterestValues";
import {initialInterestErrors} from "./initialInterestErrors";
import CustomTextArea from "../../inscription-form/custom/CustomTextArea";
import {sendBringAFriendMail} from "../../../services/MailService";

export default function InterestForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [interestResult, setInterestResult] = useState(undefined);
  const [interestError, setInterestError] = useState(undefined);
  const [values, setValues] = useState(initialInterestValues);
  const [errors, setErrors] = useState(initialInterestErrors);
  const [canChangeContent, setCanChangeContent] = useState(false);

  const handleCanChangeContent = () => {
    setCanChangeContent(!canChangeContent);
  };

  function prepareMailContent() {
    if (!canChangeContent) {
      const greeting = t("banner.interest.form.dialog.mail.greeting") + " " + `${values.friend.name}` + "\n\n";
      const body = t("banner.interest.form.dialog.mail.body") + "\n\n";
      const footer = t("banner.interest.form.dialog.mail.footer") + "\n\n" + `${values.parent.name}`;
      values.friend.content = greeting + body + footer;
    }
  }

  prepareMailContent();

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
    setValues(initialInterestValues);
    setErrors(initialInterestErrors);
    setInterestResult(undefined);
    setInterestError(undefined);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      values.friend.subject = t("banner.interest.form.dialog.mail.subject");
      sendBringAFriendMail(values).then(interestResult => {
        setInterestResult(interestResult);
      }).catch(error => {
        handleError(error);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

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

  function handleError(error) {
    if (axios.isAxiosError(error)) {
      if (error.toJSON().code === "ERR_NETWORK") {
        const networkError = {
          message: error.toJSON().message,
          details: t("inscription.confirmation.error.network"),
          values: error.toJSON().config.data,
        }
        setInterestError(networkError);
      } else {
        const backendError = {
          message: error.toJSON().message,
          details: JSON.stringify(error.response?.data?.error?.details),
          values: error.toJSON().config.data,
        }
        setInterestError(backendError);
      }
    } else {
      const validationError = {
        message: t("inscription.confirmation.error.undefined"),
        details: JSON.stringify(error),
        values: values,
      }
      setInterestError(validationError);
    }
  }

  function updateErrors() {
    errors.parent.name = values.parent.name ? null : t("banner.interest.form.parent.error.name");
    errors.parent.email = values.parent.email ? null : t("banner.interest.form.parent.error.email");
    errors.friend.name = values.friend.name ? null : t("banner.interest.form.friend.error.name");
    errors.friend.email = values.friend.email ? null : t("banner.interest.form.friend.error.email");
    errors.friend.content = values.friend.content ? null : t("banner.interest.form.friend.error.email");

    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return Object.values(errors.parent).every((error) => error === null) &&
      Object.values(errors.friend).every((error) => error === null) &&
      !Object.values(values.parent).every((value) => value === '' || value === null || value === false) &&
      !Object.values(values.friend).every((value) => value === '' || value === null || value === false);
  }

  function getDialogTitle() {
    if (isLoading) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.loading")}</DialogTitle>;
    }
    if (!!interestResult) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.success")}</DialogTitle>;
    }
    if (!!interestError) {
      return <DialogTitle>{t("banner.interest.form.dialog.title.error")}</DialogTitle>;
    }
    return <DialogTitle>{t("banner.interest.form.dialog.title.normal")}</DialogTitle>;
  }

  function getDialogContentText() {
    if (isLoading) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.loading")}</DialogContentText>;
    }
    if (!!interestResult) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.success")}</DialogContentText>;
    }
    if (!!interestError) {
      return <DialogContentText>{t("banner.interest.form.dialog.subtitle.error")}</DialogContentText>;
    }
    return <DialogContentText>{t("banner.interest.form.dialog.subtitle.normal")}</DialogContentText>;
  }

  function getLeftButton() {
    if (!!interestResult) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.interest.form.dialog.action.back")}
      </div>;
    }
    if (!!interestError) {
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
      return <div className="banner-button-dialog">
        {t("banner.interest.form.dialog.action.send")}
      </div>;
    }
    if (!!interestResult) {
      return <div className="banner-button-dialog" onClick={handleClear}>
        {t("banner.interest.form.dialog.action.another")}
      </div>;
    }
    if (!!interestError) {
      return <div className="banner-button-dialog" onClick={handleSend}>
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
              onChange={handleInputChange}
              disabled={!!interestResult || !!interestError}
              error={errors.parent.name}
            />

            <CustomTextField
              subject={"parent"}
              label={t("banner.interest.form.dialog.section.1.text.field.2")}
              name="email"
              value={values.parent.email}
              onChange={handleInputChange}
              disabled={!!interestResult || !!interestError}
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
              onChange={handleInputChange}
              disabled={!!interestResult || !!interestError}
              error={errors.friend.name}
            />
            <CustomTextField
              subject={"friend"}
              label={t("banner.interest.form.dialog.section.2.text.field.2")}
              name="email"
              value={values.friend.email}
              onChange={handleInputChange}
              disabled={!!interestResult || !!interestError}
              error={errors.friend.email}
            />
            <CustomTextArea
              subject={"friend"}
              label={t("banner.interest.form.dialog.section.2.text.field.3")}
              name="content"
              value={values.friend.content}
              onChange={handleInputChange}
              disabled={!canChangeContent || !!interestResult || !!interestError}
              error={errors.friend.content}
            />
            <div className="section-header">
              <label>
                <input
                  type="checkbox"
                  checked={canChangeContent}
                  onChange={handleCanChangeContent}
                  disabled={!!interestResult || !!interestError}
                />
                {t("banner.interest.form.dialog.section.2.checkbox")}
              </label>
            </div>

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
