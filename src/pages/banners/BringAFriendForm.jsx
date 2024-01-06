import * as React from 'react';
import {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";
import {Form} from "../inscription-form/useForm";
import CustomTextField from "../inscription-form/custom/CustomTextField";
import {claimDiscount} from "../../services/FriendService";
import axios from "axios";
import {initialBringFriendValues} from "./initialBringFriendValues";
import {initialBringFriendErrors} from "./initialBringFriendErrors";

export default function BringAFriendForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [bringFriendResult, setBringFriendResult] = useState(undefined);
  const [bringFriendError, setBringFriendError] = useState(undefined);
  const [values, setValues] = useState(initialBringFriendValues);

  const [errors, setErrors] = useState(initialBringFriendErrors);

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
    setValues(initialBringFriendValues);
    setErrors(initialBringFriendErrors);
    setBringFriendResult(undefined);
    setBringFriendError(undefined);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    updateErrors();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      claimDiscount(values).then(bringFriendResult => {
        setBringFriendResult(bringFriendResult);
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
        setBringFriendError(networkError);
      } else {
        const backendError = {
          message: error.toJSON().message,
          details: JSON.stringify(error.response?.data?.error?.details),
          values: error.toJSON().config.data,
        }
        setBringFriendError(backendError);
      }
    } else {
      const validationError = {
        message: t("inscription.confirmation.error.undefined"),
        details: JSON.stringify(error),
        values: values,
      }
      setBringFriendError(validationError);
    }
  }

  function updateErrors() {
    errors.parent.name = values.parent.name ? null : t("banner.bringafriend.form.parent.error.name")
    errors.parent.email = values.parent.email ? null : t("banner.bringafriend.form.parent.error.email")
    errors.friend.name = values.friend.name ? null : t("banner.bringafriend.form.friend.error.name")

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
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.loading")}</DialogTitle>;
    }
    if (!!bringFriendResult) {
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.success")}</DialogTitle>;
    }
    if (!!bringFriendError) {
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.error")}</DialogTitle>;
    }
    return <DialogTitle>{t("banner.bringafriend.form.dialog.title.normal")}</DialogTitle>;
  }

  function getDialogContentText() {
    if (isLoading) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.loading")}</DialogContentText>;
    }
    if (!!bringFriendResult) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.success")}</DialogContentText>;
    }
    if (!!bringFriendError) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.error")}</DialogContentText>;
    }
    return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.normal")}</DialogContentText>;
  }

  function getLeftButton() {
    if (!!bringFriendResult) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.bringafriend.form.dialog.action.back")}
      </div>;
    }
    if (!!bringFriendError) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.bringafriend.form.dialog.action.cancel")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleClose}>
      {t("banner.bringafriend.form.dialog.action.cancel")}
    </div>;
  }

  function getRightButton() {
    if (isLoading) {
      return <div className="banner-button-dialog">
        {t("banner.bringafriend.form.dialog.action.send")}
      </div>;
    }
    if (!!bringFriendResult) {
      return <div className="banner-button-dialog" onClick={handleClear}>
        {t("banner.bringafriend.form.dialog.action.another")}
      </div>;
    }
    if (!!bringFriendError) {
      return <div className="banner-button-dialog" onClick={handleSend}>
        {t("banner.bringafriend.form.dialog.action.retry")}
      </div>;
    }
    return <div className="banner-button-dialog" onClick={handleSend}>
      {t("banner.bringafriend.form.dialog.action.send")}
    </div>;
  }

  return (
    <>
      <div className="banner-button" onClick={handleClickOpen}>
        {t("banner.bringafriend.form.button")}
      </div>
      <Dialog open={open} onClose={handleClose}>
        {getDialogTitle()}
        <DialogContent>
          {getDialogContentText()}
          <div className="section-header">
            <h3>{t("banner.bringafriend.form.dialog.section.1.header")}</h3>
          </div>
          <Form>
            <CustomTextField
              subject={"parent"}
              label={t("banner.bringafriend.form.dialog.section.1.text.field.1")}
              name="name"
              value={values.parent.name}
              onChange={handleInputChange}
              disabled={!!bringFriendResult || !!bringFriendError}
              error={errors.parent.name}
            />

            <CustomTextField
              subject={"parent"}
              label={t("banner.bringafriend.form.dialog.section.1.text.field.2")}
              name="email"
              value={values.parent.email}
              onChange={handleInputChange}
              disabled={!!bringFriendResult || !!bringFriendError}
              error={errors.parent.email}
            />

            <div className="section-header">
              <h3>{t("banner.bringafriend.form.dialog.section.2.header")}</h3>
            </div>
            <CustomTextField
              subject={"friend"}
              label={t("banner.bringafriend.form.dialog.section.2.text.field.1")}
              name="name"
              value={values.friend.name}
              onChange={handleInputChange}
              disabled={!!bringFriendResult || !!bringFriendError}
              error={errors.friend.name}
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
