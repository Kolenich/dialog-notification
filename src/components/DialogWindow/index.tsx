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
import { DialogProviderProps, DialogWindowProps } from '../../DialogProvider/types';
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
      onClose={() => {
        closeDialog();
        options?.onClose?.();
      }}
      disableBackdropClick={['loading', 'warning'].includes(options?.variant || 'info')}
      disableEscapeKeyDown={['loading', 'warning'].includes(options?.variant || 'info')}
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
        {['error', 'success', 'info'].includes(options?.variant || 'info') && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              closeDialog();
              options?.onClose?.();
            }}
            endIcon={providerOptions.closeButtonIcon || <Done/>}
          >
            {providerOptions.closeButtonText || 'OK'}
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
              endIcon={providerOptions.acceptButtonIcon || <Done/>}
            >
              {providerOptions.acceptButtonText || 'Accept'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                closeDialog();
                options?.onClose?.();
              }}
              endIcon={providerOptions.declineButtonIcon || <Cancel/>}
            >
              {providerOptions.declineButtonText || 'Cancel'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
