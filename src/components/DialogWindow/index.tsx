import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { Cancel, Done } from '@material-ui/icons';
import clsx from 'clsx';
import React, { FC, useContext } from 'react';
import DialogContext from '../../DialogContext';
import { DialogProviderProps, DialogVariant, DialogWindowProps } from '../../DialogProvider/types';
import { getDialogTitle, getIconClass, VariantIcon } from '../../utils';
import styles from './styles';

const useStyles = makeStyles(styles);

interface Props extends DialogWindowProps, DialogProviderProps {
}

/** Dialog window component */
const DialogWindow: FC<Props> = ({ options, open, message, ...providerOptions }) => {
  const classes = useStyles();
  const { closeDialog } = useContext(DialogContext);

  /** Icon component rendered in Dialog window header */
  const Icon = VariantIcon(options?.variant);

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle>
        <Grid container alignItems="center" spacing={2}>
          <Icon className={clsx(classes.icon, classes[getIconClass(options?.variant)])}/>
          {options?.title || getDialogTitle(options?.variant)}
        </Grid>
      </DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        {['error', 'success', 'info'].includes(options?.variant as DialogVariant) && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              closeDialog();
              options?.onClose?.();
            }}
            endIcon={providerOptions.closeButtonIcon}
          >
            {providerOptions.closeButtonText}
          </Button>
        )}
        {options?.variant === 'warning' && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeDialog();
                options?.onAccept?.();
              }}
              endIcon={providerOptions.acceptButtonIcon}
            >
              {providerOptions.acceptButtonText}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                closeDialog();
                options?.onClose?.();
              }}
              endIcon={providerOptions.declineButtonIcon}
            >
              {providerOptions.declineButtonText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

DialogWindow.defaultProps = {
  options: {
    variant: 'info',
  },
  closeButtonIcon: <Done/>,
  closeButtonText: 'OK',
  acceptButtonIcon: <Done/>,
  acceptButtonText: 'Accept',
  declineButtonIcon: <Cancel/>,
  declineButtonText: 'Cancel',
};

export default DialogWindow;
