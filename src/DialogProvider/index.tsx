import DialogWindow from 'components/DialogWindow';
import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { DialogContextValue, DialogOptions, DialogProviderProps, DialogState } from './types';

/** Main context */
export const DialogContext = createContext<DialogContextValue>({} as DialogContextValue);

/**
 * Provider component
 * @param {React.ReactNode} children - child components to be provided with context value
 * @param {DialogProviderProps} providerOptions - options from initializing DialogProvider
 * @returns {JSX.Element}
 * @constructor
 */
const DialogProvider: FC<DialogProviderProps> = ({ children, ...providerOptions }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    message: null,
  });

  const contextValue = useMemo(() => ({
    /**
     * Function for opening Dialog window
     * @param {React.ReactNode} message - main content of the Dialog window
     * @param {DialogOptions} options - additional options to Dialog window
     */
    openDialog: (message: ReactNode, options?: DialogOptions) => setDialogState({
      message,
      options,
      open: true,
    }),
    /** Function, that closes Dialog window */
    closeDialog: () => setDialogState({ open: false, message: null }),
  }), []);

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogWindow {...providerOptions} {...dialogState} />
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
