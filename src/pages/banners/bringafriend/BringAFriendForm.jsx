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
import {claimDiscount} from "../../../services/FriendService";
import {initialBringFriendValues} from "./initialBringFriendValues";
import {initialBringFriendErrors} from "./initialBringFriendErrors";
import {handleError, handleInputChange, hasNoErrors, hasValues} from "../../common/utils";

export default function BringAFriendForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [axiosResult, setAxiosResult] = useState(undefined);
  const [axiosError, setAxiosError] = useState(undefined);
  const [values, setValues] = useState(initialBringFriendValues);
  const [errors, setErrors] = useState(initialBringFriendErrors);

  useEffect(() => {
    if (!showValidation) {
      return;
    }
    validate();
  }, [values, showValidation]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClear = () => {
    setShowValidation(false);
    setValues(initialBringFriendValues);
    setErrors(initialBringFriendErrors);
    setAxiosResult(undefined);
    setAxiosError(undefined);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    validate();
    setShowValidation(true);
    if (canSend()) {
      setIsLoading(true);
      claimDiscount(values).then(result => {
        setAxiosResult(result);
      }).catch(error => {
        handleError(t, error, setAxiosError, values);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  function validate() {
    errors.parent.name = values.parent.name ? null : t("banner.bringafriend.form.parent.error.name")
    errors.parent.email = values.parent.email ? null : t("banner.bringafriend.form.parent.error.email")
    errors.friend.name = values.friend.name ? null : t("banner.bringafriend.form.friend.error.name")

    setErrors({
        ...errors
      }
    )
  }

  function canSend() {
    return hasNoErrors(errors.parent) && hasValues(values.parent) &&
      hasNoErrors(errors.friend) && hasValues(values.friend);
  }

  function getDialogTitle() {
    if (isLoading) {
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.loading")}</DialogTitle>;
    }
    if (!!axiosResult) {
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.success")}</DialogTitle>;
    }
    if (!!axiosError) {
      return <DialogTitle>{t("banner.bringafriend.form.dialog.title.error")}</DialogTitle>;
    }
    return <DialogTitle>{t("banner.bringafriend.form.dialog.title.normal")}</DialogTitle>;
  }

  function getDialogContentText() {
    if (isLoading) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.loading")}</DialogContentText>;
    }
    if (!!axiosResult) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.success")}</DialogContentText>;
    }
    if (!!axiosError) {
      return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.error")}</DialogContentText>;
    }
    return <DialogContentText>{t("banner.bringafriend.form.dialog.subtitle.normal")}</DialogContentText>;
  }

  function getLeftButton() {
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleClose}>
        {t("banner.bringafriend.form.dialog.action.back")}
      </div>;
    }
    if (!!axiosError) {
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
    if (!!axiosResult) {
      return <div className="banner-button-dialog" onClick={handleClear}>
        {t("banner.bringafriend.form.dialog.action.another")}
      </div>;
    }
    if (!!axiosError) {
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
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
              error={errors.parent.name}
            />

            <CustomTextField
              subject={"parent"}
              label={t("banner.bringafriend.form.dialog.section.1.text.field.2")}
              name="email"
              value={values.parent.email}
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
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
              onChange={(e) => handleInputChange(e, setValues, values)}
              disabled={!!axiosResult || !!axiosError}
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
