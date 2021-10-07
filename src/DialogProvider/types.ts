import { ReactNode } from 'react';

export interface DialogContextValue {
  openDialog: (message: string, options?: DialogOptions) => void;
  closeDialog: (event?: Record<string, never>, reason?: string) => void;
}

export interface DialogState {
  open: boolean;
  message: ReactNode;
  options?: DialogOptions;
}

export type DialogWindowProps = DialogState;

export interface DialogOptions {
  variant: DialogVariant;
  onAccept?: () => void;
  onClose?: () => void;
  title?: string;
}

export interface DialogProviderProps {
  closeButtonText?: string;
  closeButtonIcon?: ReactNode;
  acceptButtonText?: string;
  acceptButtonIcon?: ReactNode;
  declineButtonText?: string;
  declineButtonIcon?: ReactNode;
}

export type DialogVariant = 'error' | 'success' | 'loading' | 'warning' | 'info';
