import React from 'react';
import GithubCorner from 'react-github-corner';
import '../tailwind.output.css';
import Game from './game/Game';
import { SnackbarWrapper } from './snackbars/SnackbarWrapper';
const App: React.FunctionComponent = () => {
  return (
    <SnackbarWrapper>
      <div className="bg-dark-blue flex flex-col min-h-screen">
        <GithubCorner href="https://github.com/albinjal/unbeatable-tictactoe" octoColor="#21252b" bannerColor="#fff" />
        <Game />
      </div>
    </SnackbarWrapper>
  );
};

export default App;
