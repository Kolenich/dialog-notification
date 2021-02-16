import DialogContext from 'DialogContext';
import { DialogContextValue } from 'DialogProvider/types';
import { useContext } from 'react';

/**
 * Custom hook to access DialogContext value
 * @returns {DialogContextValue}
 */
export default (): DialogContextValue => useContext(DialogContext);
