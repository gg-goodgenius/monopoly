import React from 'react';
import Board from './components/board/Board';
import './App.css'
import GamersList from './components/gamersList/GamersList';
import CardsList from './components/cardsList/CardsList';
import Cubes from './components/cubes/Cubes';
import ActionPanel from './components/actionPanel/ActionPanel';
import UserInfoPanel from './components/userInfoPanel/UserInfoPanel';

function App() {
  return (
    <div className="game">
      <Board />
      <div className="gamePanel">
        <div className='gameSubPanel'>
          <Cubes />
          <ActionPanel />
          <UserInfoPanel wallet='0x00' balance={0} />
          <GamersList />
        </div>
        <div className='gameSubPanel'>
          <CardsList />
        </div>
      </div>
    </div>

  );
}

export default App;
