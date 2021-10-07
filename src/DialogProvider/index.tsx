import React, { FC, ReactNode, useMemo, useState } from 'react';
import DialogWindow from '../components/DialogWindow';
import DialogContext from '../DialogContext';
import { DialogOptions, DialogProviderProps, DialogState } from './types';

/** Provider component */
const DialogProvider: FC<DialogProviderProps> = ({ children, ...providerOptions }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    message: null,
  });

  /** Main value of context */
  const contextValue = useMemo(() => ({
    /**
     * Function for opening Dialog
     *
     * @param {React.ReactNode} message - content of the Dialog window
     * @param {DialogOptions} options - additional options
     */
    openDialog: (message: ReactNode, options?: DialogOptions) => setDialogState({
      message,
      options,
      open: true,
    }),
    /** Function for closing Dialog window manually */
    closeDialog: (event?: Record<string, never>, reason?: string) => {
      if (!['backdropClick', 'escapeKeyDown'].includes(reason as string)) {
        setDialogState((oldState) => ({ ...oldState, open: false }));
      }
    },
  }), []);

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogWindow {...providerOptions} {...dialogState}/>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
