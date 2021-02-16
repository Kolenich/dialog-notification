import React, { ComponentType } from 'react';
import DialogContext from './DialogContext';

/**
 * A decorator to wrap components and provide them with value from DialogContext
 * @param {React.ComponentType<T>} Component - component to be wrapped
 * @returns {(props: T) => JSX.Element}
 */
export default <T extends Record<string, never>>(Component: ComponentType<T>) => (props: T) => (
  <DialogContext.Consumer>
    {(context) => <Component {...context} {...props}/>}
  </DialogContext.Consumer>
);
