import { Cancel, Done } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import React, { FC, useContext } from 'react';
import DialogContext from '../../DialogContext';
import { DialogProviderProps, DialogVariant, DialogWindowProps } from '../../DialogProvider/types';
import { getDialogTitle, getIconClass, VariantIcon } from '../../utils';
import sx from './sx';

type Props = DialogWindowProps & DialogProviderProps;

/** Dialog window component */
const DialogWindow: FC<Props> = ({ options, open, message, ...providerOptions }) => {
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
          <Icon sx={{ ...sx.icon, ...sx[getIconClass(options?.variant)] }}/>
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
