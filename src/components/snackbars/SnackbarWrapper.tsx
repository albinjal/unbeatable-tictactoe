import React, { useState } from 'react';
import { Snackbar } from './Snackbars';

export enum SnackbarTypes {
  Default,
}

export interface SnackbarHandler {
  openSnackbar: (message: string, type?: SnackbarTypes, millis?: number) => Promise<void>;
}

export const SnackbarContext = React.createContext<SnackbarHandler>({ openSnackbar: async () => undefined });

interface Props {
  children?: React.ReactNode;
}

interface SnackbarState {
  type: SnackbarTypes;
  open: boolean;
  message: string;
}
const closedState = { type: SnackbarTypes.Default, open: false, message: '' };

export const SnackbarWrapper: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [state, setState] = useState<SnackbarState>(closedState);

  const openSnackbar = async (message: string, type = SnackbarTypes.Default, millis = 6000): Promise<void> => {
    return new Promise((resolve) => {
      setState({ message, type, open: true });
      setTimeout(() => {
        closeSnackbar();
        resolve();
      }, millis);
    });
  };

  const closeSnackbar = () => {
    setState(closedState);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      {state.open ? <Snackbar message={state.message} type={state.type} /> : null}
    </SnackbarContext.Provider>
  );
};
