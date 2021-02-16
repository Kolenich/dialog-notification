import React, { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import DialogWindow from '../components/DialogWindow';
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
    openDialog: (message: ReactNode, options: DialogOptions = { variant: 'info' }) => setDialogState({
      message,
      options,
      open: true,
    }),
    /** Function, that manually closes Dialog window */
    closeDialog: () => setDialogState((oldState) => ({ ...oldState, open: false })),
  }), []);

  /**
   * Function for closing Dialog window
   * @type {() => void}
   */
  const closeDialog = useCallback(() => setDialogState((oldDialogState) => ({
    ...oldDialogState,
    open: false,
  })), []);

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogWindow {...providerOptions} {...dialogState} onClose={closeDialog}/>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
