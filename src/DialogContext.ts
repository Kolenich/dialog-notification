import { createContext } from 'react';
import { DialogContextValue } from './DialogProvider/types';

/** Main context */
export default createContext<DialogContextValue>({} as DialogContextValue);
