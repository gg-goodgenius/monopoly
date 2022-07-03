import GamerItem from '../gamerItem/GamerItem';
import './GamersList.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'


function GamersList() {
    const { gameState } = useContext(StateContext)
    return (
        <div className="panel">
            <div className="header">
                Gamers
            </div>
            <div className="gamers">
                {
                    gameState?.users && gameState.users.map((gamer: any, index: number) => {
                        return <GamerItem key={gamer.index} {...gamer}/>
                    })
                }
            </div>
        </div>
    )

}

export default GamersList;