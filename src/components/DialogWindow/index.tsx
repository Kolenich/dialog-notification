import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { Cancel, Done } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { DialogProviderProps, DialogState } from 'DialogProvider/types';
import React, { FC, useCallback, useMemo } from 'react';
import useDialog from 'useDialog';
import { getDialogTitle, getIconClass, VariantIcon } from 'utils';
import { iconStyles, mainStyles } from './styles';

const useIconStyles = makeStyles(iconStyles);
const useMainStyles = makeStyles(mainStyles);

/**
 * Dialog window component
 * @param open {Boolean} - flag to open/close Dialog window
 * @param {React.ReactNode} message - main content of the Dialog window
 * @param {DialogOptions} options? - additional options to opening Dialog window
 * @param {DialogProviderProps} providerOptions - options from initializing DialogProvider
 * @constructor
 */
const DialogWindow: FC<DialogState & DialogProviderProps> = ({
  open, message, options, ...providerOptions
}) => {
  const classesIcon = useIconStyles();
  const classes = useMainStyles();
  const { closeDialog } = useDialog();

  /** Function for invoking options.onClose callback after closing Dialog window */
  const closeDialogWindow = useCallback(() => {
    closeDialog();
    if (options?.onClose) {
      options.onClose();
    }
  }, [options?.onClose, closeDialog]);

  /** Function for invoking options.onAccept callback after closing Dialog window */
  const acceptWarning = useCallback(() => {
    closeDialog();
    if (options?.onAccept) {
      options.onAccept();
    }
  }, [options?.onAccept, closeDialog]);

  /** Icon component rendered in Dialog window header */
  const Icon = useMemo(() => VariantIcon(options?.variant), [options?.variant]);

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={closeDialogWindow}
      disableBackdropClick={['loading', 'warning'].includes(options?.variant || 'info')}
      disableEscapeKeyDown={['loading', 'warning'].includes(options?.variant || 'info')}
    >
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs="auto">
            <Icon className={clsx(classes.icon, classesIcon[getIconClass(options?.variant)])}/>
          </Grid>
          <Grid item xs="auto">
            {options?.title || getDialogTitle(options?.variant)}
          </Grid>
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
            onClick={closeDialogWindow}
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
              onClick={acceptWarning}
              endIcon={providerOptions.acceptButtonIcon || <Done/>}
            >
              {providerOptions.acceptButtonText || 'Accept'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={closeDialogWindow}
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
