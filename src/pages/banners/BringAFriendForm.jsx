import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";

export default function BringAFriendForm() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="banner-button" onClick={handleClickOpen}>
        {t("bringafriend.form.button")}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("bringafriend.form.dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("bringafriend.form.dialog.subtitle")}
          </DialogContentText>
          <div className="section-header">
            <h3>{t("bringafriend.form.dialog.section.1.header")}</h3>
          </div>
          <TextField autoFocus margin="dense" id="name" label={t("bringafriend.form.dialog.section.1.text.field.1")} type="email" fullWidth
                     variant="standard"/>
          <TextField autoFocus margin="dense" id="name" label={t("bringafriend.form.dialog.section.1.text.field.2")} fullWidth variant="standard"/>
          <TextField autoFocus margin="dense" id="name" label={t("bringafriend.form.dialog.section.1.text.field.3")} type="email" fullWidth
                     variant="standard"/>
          <div className="section-header">
            <h3>{t("bringafriend.form.dialog.section.2.header")}</h3>
          </div>
          <TextField autoFocus margin="dense" id="name" label={t("bringafriend.form.dialog.section.2.text.field.1")} fullWidth variant="standard"/>
        </DialogContent>
        <DialogActions>
          <div className="banner-button-dialog" onClick={handleClose}>
            {t("bringafriend.form.dialog.action.cancel")}
          </div>
          <div className="banner-button-dialog" onClick={handleClose}>
            {t("bringafriend.form.dialog.action.send")}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
