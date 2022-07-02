import React from 'react';
import Board from './components/board/Board';
import './App.css'
import GamersList from './components/gamersList/GamersList';
import CardsList from './components/cardsList/CardsList';
import Cubes from './components/cubes/Cubes';

function App() {
  return (
    <div className="game">
      <Board />
      <div className="gamePanel">
        <GamersList />
        <CardsList />
        <Cubes />
      </div>
    </div>

  );
}

export default App;
