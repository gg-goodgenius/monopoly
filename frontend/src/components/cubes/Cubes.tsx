import './Cubes.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'

function Cubes() {
    const { cubes } = useContext(StateContext)

    return (
        <div className='panel'>
            <div className='header'>
                Cubes
            </div>
            {cubes &&
                <div className="cubes">
                    {cubes[0]} - {cubes[1]}
                </div>}

        </div>
    )

}

export default Cubes;