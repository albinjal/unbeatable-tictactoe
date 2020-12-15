import React from 'react';
import DefaultSnackbar from './DefaultSnackbar';
import { SnackbarTypes } from './SnackbarWrapper';

interface Props {
  message: string;
  type: SnackbarTypes;
}
export const Snackbar: React.FunctionComponent<Props> = ({ message, type }: Props) => {
  switch (type) {
    default:
      return <DefaultSnackbar message={message} />;
  }
};
