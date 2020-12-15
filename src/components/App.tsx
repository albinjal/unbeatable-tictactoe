import React from 'react';
import '../tailwind.output.css';
import Game from './game/Game';
import { SnackbarWrapper } from './snackbars/SnackbarWrapper';
const App: React.FunctionComponent = () => {
  return (
    <SnackbarWrapper>
      <div className="bg-dark-blue flex flex-col min-h-screen">
        <Game />
        <footer>Footer</footer>
      </div>
    </SnackbarWrapper>
  );
};

export default App;
