import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CardContent} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";
import {MyStyledButton} from "./MyStyledButton";

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
        {t("bringafriend.conditions.button")}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t("bringafriend.conditions.dialog.title")}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <CardContent className="pricing1__card-content text-left">
              <ul>
                <li>{t("bringafriend.conditions.dialog.content.1")}</li>
                <li>{t("bringafriend.conditions.dialog.content.2")}</li>
                <li>{t("bringafriend.conditions.dialog.content.3")}</li>
                <li>{t("bringafriend.conditions.dialog.content.4")}</li>
                <li>{t("bringafriend.conditions.dialog.content.5")}</li>
                <li>{t("bringafriend.conditions.dialog.content.6")}</li>
              </ul>
              <p><Trans i18nKey="bringafriend.conditions.dialog.content.footer" components={{bold: <strong/>}}/></p>
            </CardContent>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="banner-button-dialog" onClick={handleClose}>
            {t("common.button.close")}
          </div>
          {/*<Button color="primary" variant="contained" onClick={handleClose}>{t("common.button.close")}</Button>*/}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
    ;
}
