import './CardItem.css'
import { MiniButton } from "../shared/button";

function CardItem(props: any) {
    let level = 'No update'
    if (props.level === 5) {
        level = 'Hotel'
    } else if (props.level === 0) {
        level = 'No builds'
    } else level = props.level + ' house'

    return (
        <div className="cardItem">
            <div className="name">
                <div className={"color " + props.color}></div>
                <div >{props.name}</div>
            </div>
            <div>Building: {level}</div>
            <div> 
            <MiniButton name='Build'/>
            <MiniButton name='Sell'/>
            <MiniButton name='Mortgage'/>
            <MiniButton name='Offer'/>
            </div>
        </div>
    )

}

export default CardItem;