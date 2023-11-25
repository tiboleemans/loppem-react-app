import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CardContent} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";

export default function BringAFriendConditionsDialog() {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <div className="banner-button" onClick={handleClickOpen('paper')}>
        {t("banner.bringafriend.conditions.button")}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t("banner.bringafriend.conditions.dialog.title")}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CardContent>
              <ul>
                <li>{t("banner.bringafriend.conditions.dialog.content.1")}</li>
                <li>{t("banner.bringafriend.conditions.dialog.content.2")}</li>
                <li>{t("banner.bringafriend.conditions.dialog.content.3")}</li>
                <li>{t("banner.bringafriend.conditions.dialog.content.4")}</li>
                <li>{t("banner.bringafriend.conditions.dialog.content.5")}</li>
                <li>{t("banner.bringafriend.conditions.dialog.content.6")}</li>
              </ul>
              <p><Trans i18nKey="banner.bringafriend.conditions.dialog.content.footer"/></p>
            </CardContent>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="banner-button-dialog" onClick={handleClose}>
            {t("common.button.close")}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
    ;
}
