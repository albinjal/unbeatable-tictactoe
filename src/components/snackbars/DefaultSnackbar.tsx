import React from 'react';

interface Props {
  message: string;
}
const DefaultSnackbar: React.FunctionComponent<Props> = ({ message }: Props) => (
  <div className="flex justify-center">
    <span className="fixed bottom-0">
      <p className="text-center p-3 px-6 m-4 rounded-full text-lg font-semibold shadow bg-imperial-red text-honeydew opacity-75">
        {message}
      </p>
    </span>
  </div>
);

export default DefaultSnackbar;
