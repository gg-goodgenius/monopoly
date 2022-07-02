import GamerItem from '../gamerItem/GamerItem';
import './GamersList.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'


function GamersList() {
    const { listGamers } = useContext(StateContext)
    return (
        <div className="panel">
            <div className="header">
                Gamers
            </div>
            <div className="gamers">
                {
                    listGamers.map((gamer: any, index: number) => {
                        return <GamerItem {...gamer} />
                    })
                }
            </div>
        </div>
    )

}

export default GamersList;