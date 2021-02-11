import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { CheckCircle, Error, Info, SvgIconComponent, Warning } from '@material-ui/icons';
import { DialogVariant } from './DialogProvider/types';

type LoadingIconComponent = (props: CircularProgressProps) => JSX.Element;

export const VariantIcon = (variant?: DialogVariant): SvgIconComponent | LoadingIconComponent => {
  switch (variant) {
  case 'error':
    return Error;
  case 'success':
    return CheckCircle;
  case 'warning':
    return Warning;
  case 'loading':
    return CircularProgress;
  default:
    return Info;
  }
};

export const getIconClass = (variant?: DialogVariant) => {
  if (variant) {
    return variant;
  }
  return 'info';
};

export const getDialogTitle = (variant?: DialogVariant) => {
  switch (variant) {
  case 'error':
    return 'Error!';
  case 'info':
    return 'Info';
  case 'loading':
    return 'Loading. Please wait...';
  case 'success':
    return 'Success!';
  case 'warning':
    return 'Warning!';
  default:
    return 'Info';
  }
};
