import { SvgIconComponent } from '@material-ui/icons';
import { ComponentType, FC, ReactNode } from 'react';

export interface DialogContextValue {
  /**
   * Main function to open Dialog window
   *
   * @param {ReactNode} message - main content of the Dialog window
   *
   * @param {DialogOptions} options - additional options for Dialog wondow view
   */
  openDialog: (message: ReactNode, options: DialogOptions) => void;
}

export interface DialogOptions {
  /**
   * Options object for Dialog view
   */
  variant: DialogVariant;
  /**
   * Callback fired, when accepting 'warning' variant of Dialog window
   */
  onAccept?: () => void;
  /**
   * Callback fired, when Dialog window was closed
   */
  onClose?: () => void;
  /**
   * Dialog window title
   */
  title?: string;
}

export interface DialogProviderProps {
  /**
   * Text of 'OK' button, that closes Dialog window
   */
  closeButtonText?: string;
  /**
   * Icon of 'OK' button, that closes Dialog window
   */
  closeButtonIcon?: SvgIconComponent;
  /**
   * Text of 'Accept' button, that fires onAccept callback
   */
  acceptButtonText?: string;
  /**
   * Icon of 'Accept' button, that fires onAccept callback
   */
  acceptButtonIcon?: SvgIconComponent;
  /**
   * Text of 'Cancel' button, that closes Dialog window
   */
  declineButtonText?: string;
  /**
   * Icon of 'Cancel' button, that closes Dialog window
   */
  declineButtonIcon?: SvgIconComponent;
}

export type DialogVariant = 'error' | 'success' | 'loading' | 'warning' | 'info';

export function DialogProvider(props: DialogProviderProps): JSX.Element;

export function useDialog(): DialogContextValue;

export function withDialog<T>(component: ComponentType<T>): ComponentType<T & DialogContextValue>;


