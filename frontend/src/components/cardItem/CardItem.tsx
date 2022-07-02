import './CardItem.css'
import { MiniButton } from "../shared/button";

function CardItem(props: any) {
    let level = 'No update'
    if (props.level === 5) {
        level = 'Hotel'
    } else if (props.level === 0) {
        level = 'No builds'
    } else level = props.level + ' house'

    const handleBuild = () => {
        // send request to back
        // send ton in channel for bank
    }

    const handleSell = () => {
        // send request to back
        // wait ton from bank
    }

    const handleMortage = () => {
        // send request to back
        // wait ton from bank
    }

    const handleOffer = () => {
        // send request to back
    }

    return (
        <div className="cardItem">
            <div className="name">
                <div className={"color " + props.color}></div>
                <div >{props.name}</div>
            </div>
            <div>Building: {level}</div>
            <div> 
            <MiniButton name='Build' onClick={handleBuild}/>
            <MiniButton name='Sell' onClick={handleSell}/>
            <MiniButton name='Mortgage' disabled={true} onClick={handleMortage}/>
            <MiniButton name='Offer' onClick={handleOffer}/>
            </div>
        </div>
    )

}

export default CardItem;