import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  WithStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Cancel, Done } from '@material-ui/icons';
import clsx from 'clsx';
import React, { Component } from 'react';
import { DialogProviderProps, DialogWindowProps } from '../../DialogProvider/types';
import { getDialogTitle, getIconClass, VariantIcon } from '../../utils';
import styles from './styles';

interface Props extends DialogWindowProps, DialogProviderProps, WithStyles<typeof styles> {
}

/** Dialog window component */
class DialogWindow extends Component<Props> {
  /** Function for invoking options.onClose callback after closing Dialog window */
  closeDialogWindow = () => {
    const { onClose, options } = this.props;
    onClose();
    options?.onClose?.();
  }

  /** Function for invoking options.onAccept callback after closing Dialog window */
  acceptWarning = () => {
    const { onClose, options } = this.props;
    onClose();
    options?.onAccept?.();
  }

  /** Icon component rendered in Dialog window header */
  get Icon() {
    const { options } = this.props;
    return VariantIcon(options?.variant);
  }

  render() {
    const { options, open, message, classes, ...providerOptions } = this.props;

    return (
      <Dialog
        scroll="paper"
        open={open}
        onClose={this.closeDialogWindow}
        disableBackdropClick={['loading', 'warning'].includes(options?.variant || 'info')}
        disableEscapeKeyDown={['loading', 'warning'].includes(options?.variant || 'info')}
      >
        <DialogTitle>
          <Grid container alignItems="center" spacing={2}>
            <this.Icon className={clsx(classes.icon, classes[getIconClass(options?.variant)])}/>
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
              onClick={this.closeDialogWindow}
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
                onClick={this.acceptWarning}
                endIcon={providerOptions.acceptButtonIcon || <Done/>}
              >
                {providerOptions.acceptButtonText || 'Accept'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.closeDialogWindow}
                endIcon={providerOptions.declineButtonIcon || <Cancel/>}
              >
                {providerOptions.declineButtonText || 'Cancel'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(DialogWindow);
