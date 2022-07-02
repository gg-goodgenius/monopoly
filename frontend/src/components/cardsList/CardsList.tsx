import CardItem from '../cardItem/CardItem';
import './CardsList.css'


function CardsList() {

    return (
        <div className="panel">
            <div className="header">
                My Cards
            </div>
            <div className="cards">
                <CardItem name='BOARDWALK' level={2} color='dark-blue' />
                <CardItem name='MEDITER-RANEAN AVENUE' level={0} color='dark-purple' />
                <CardItem name='BALTIC AVENUE' level={4} color='dark-purple' />
            </div>
        </div>
    )

}

export default CardsList;