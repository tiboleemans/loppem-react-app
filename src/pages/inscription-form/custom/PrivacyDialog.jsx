import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {CardContent} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {useEffect, useRef, useState} from "react";

const PrivacyDialog = () => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <div className="inscription-dialog" onClick={handleClickOpen('paper')}>
        {t("inscription.extra.label.conditions.privacy.click")}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t("inscription.extra.label.conditions.privacy.dialog.title")}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CardContent>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.1.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.1.paragraph")}</p>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.2.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.2.paragraph")}</p>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.3.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.3.paragraph")}</p>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.4.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.4.paragraph")}</p>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.5.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.5.paragraph")}</p>
              <h3> {t("inscription.extra.label.conditions.privacy.dialog.6.subtitle")}</h3>
              <p> {t("inscription.extra.label.conditions.privacy.dialog.6.paragraph")}</p>
            </CardContent>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="banner-button-dialog" onClick={handleClose}>
            {t("common.button.close")}
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PrivacyDialog;