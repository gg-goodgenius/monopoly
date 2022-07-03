import './Cubes.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'

function Cubes() {
    const { gameState } = useContext(StateContext)
    
    return (
        <div className='panel'>
            <div className='header'>
                Cubes
            </div>
            {gameState?.dice &&
                <div className="cubes">
                    {gameState.dice[0]} - {gameState.dice[1]}
                </div>}

        </div>
    )

}

export default Cubes;