import React, { Component, createContext, ReactNode } from 'react';
import DialogWindow from '../components/DialogWindow';
import { DialogContextValue, DialogOptions, DialogProviderProps, DialogState } from './types';

/** Main context */
export const DialogContext = createContext<DialogContextValue>({} as DialogContextValue);

/** Provider component */
class DialogProvider extends Component<DialogProviderProps, DialogState> {
  constructor(props: DialogProviderProps) {
    super(props);
    this.state = {
      open: false,
      message: null,
    };
  }

  /**
   * Function for opening Dialog window
   * @param {React.ReactNode} message - main content of the Dialog window
   * @param {DialogOptions} options - additional options to Dialog window
   */
  openDialog = (message: ReactNode, options?: DialogOptions) => this.setState({
    message,
    options,
    open: true,
  })

  /** Function, that manually closes Dialog window */
  closeDialog = () => this.setState({ open: false })

  render() {
    const { children, ...providerOptions } = this.props;

    return (
      <DialogContext.Provider
        value={{ openDialog: this.openDialog, closeDialog: this.closeDialog }}
      >
        <DialogWindow {...providerOptions} {...this.state} onClose={this.closeDialog}/>
        {children}
      </DialogContext.Provider>
    );
  }
}

export default DialogProvider;
