import { useContext } from 'react';
import { DialogContext } from './DialogProvider';
import { DialogContextValue } from './DialogProvider/types';

/**
 * Custom hook to access DialogContext value
 * @returns {DialogContextValue}
 */
export default (): DialogContextValue => useContext(DialogContext);
