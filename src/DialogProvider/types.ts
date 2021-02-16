import { SvgIconComponent } from '@material-ui/icons';
import { ReactNode } from 'react';

export interface DialogContextValue {
  openDialog: (message: string, options?: DialogOptions) => void;
  closeDialog: () => void;
}

export interface DialogState {
  open: boolean;
  message: ReactNode;
  options?: DialogOptions;
}

export interface DialogWindowProps extends DialogState {
  onClose: () => void;
}

export interface DialogOptions {
  variant: DialogVariant;
  onAccept?: () => void;
  onClose?: () => void;
  title?: string;
}

export interface DialogProviderProps {
  closeButtonText?: string;
  closeButtonIcon?: SvgIconComponent;
  acceptButtonText?: string;
  acceptButtonIcon?: SvgIconComponent;
  declineButtonText?: string;
  declineButtonIcon?: SvgIconComponent;
}

export type DialogVariant = 'error' | 'success' | 'loading' | 'warning' | 'info';
