import CardItem from '../cardItem/CardItem';
import './CardsList.css'
import { useContext } from 'react'
import { StateContext } from './../../context/State'

function CardsList() {
    const { gameState, user } = useContext(StateContext)
    return (
        <div className="panel">
            <div className="header">
                My Cards
            </div>
            <div className="cards">
                {
                    gameState?.fields &&  gameState?.fields.filter((e:any) => e?.owner?.index == user?.index ).map((card: any, index: number) => {
                        return <CardItem key={card?.index} {...card} />
                    })
                }
            </div>
        </div>
    )

}

export default CardsList;