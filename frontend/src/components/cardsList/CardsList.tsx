import CardItem from '../cardItem/CardItem';
import './CardsList.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'

function CardsList() {
    const { myCards } = useContext(StateContext)
    return (
        <div className="panel">
            <div className="header">
                My Cards
            </div>
            <div className="cards">
                {
                    myCards.map((card: any, index: number) => {
                        return <CardItem key={index} {...card} />
                    })
                }
            </div>
        </div>
    )

}

export default CardsList;