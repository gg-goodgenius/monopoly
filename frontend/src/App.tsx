import React from 'react';
import Board from './components/board/Board';
import './App.css'
import GamersList from './components/gamersList/GamersList';
import CardsList from './components/cardsList/CardsList';
import Cubes from './components/cubes/Cubes';
import ActionPanel from './components/actionPanel/ActionPanel';
import WalletInfo from './components/walletInfo/WalletInfo';

function App() {
  return (
    <>
      <div className="game">
        <Board />
        <div className="gamePanel">
          <div className='gameSubPanel'>
            <Cubes />
            <ActionPanel />
            <WalletInfo />
            <GamersList />
          </div>
          <div className='gameSubPanel'>
            <CardsList />
          </div>
        </div>
      </div>
      <div className='mobile'>
        <div>
          Sorry, our game work on desktop or desktop-mode. Please, select desktop-mode on your device
        </div>
      </div>
    </>
  );
}

export default App;
