import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { CheckCircle, Error, Info, SvgIconComponent, Warning } from '@material-ui/icons';
import { DialogVariant } from './DialogProvider/types';

type LoadingIconComponent = (props: CircularProgressProps) => JSX.Element;

/**
 * Icon to be placed to the header of Dialog window
 * @param {DialogVariant} variant - Dialog variant
 * @return {SvgIconComponent | LoadingIconComponent}
 * @constructor
 */
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

/**
 * Key to CSS class based on variant option
 * @param {DialogVariant} variant - Dialog variant
 * @return {"error" | "success" | "loading" | "warning" | "info"}
 */
export const getIconClass = (variant: DialogVariant = 'info') => variant;

/**
 * Dialog title based on variant option
 * @param {DialogVariant} variant - Dialog variant
 * @return {string}
 */
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
