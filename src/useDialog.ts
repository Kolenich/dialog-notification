import { useContext } from 'react';
import { DialogContext } from './DialogProvider';

/**
 * Custom hook to access DialogContext value
 * @returns {DialogContextValue}
 */
export default () => useContext(DialogContext);
