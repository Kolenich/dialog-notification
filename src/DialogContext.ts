import { DialogContextValue } from 'DialogProvider/types';
import { createContext } from 'react';

/** Main context */
export default createContext<DialogContextValue>({} as DialogContextValue);
