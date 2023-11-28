import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {CardContent} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import "./vacations.css"

const WhereDetails = () => {
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
      <div className="vacations-details-button" onClick={handleClickOpen('paper')}>
        {t("vacations.where.details.button")}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t("vacations.where.details.title")}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CardContent>
              <Trans i18nKey="vacations.where.details.content" />
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

export default WhereDetails;