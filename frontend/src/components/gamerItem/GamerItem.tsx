import { MiniButton } from '../shared/button';
import './GamerItem.css'

function GamerItem(props: any) {
    const is_active: string = props.active ? "active " : ""
    const handleBuy = () => {
        // send requests for back
        // send ton to bank
    }
    return (
        <div key={props.name}>

            <div className={is_active + "gamerItem"} style={{ color: props.color }}>
                
                {props.address.slice(0, 5)}...{props.address.slice(-8)} - {props.balance} TON
                {props.currentStep &&
                    <span> - [X] </span>}
            </div>
            {props.offers &&
                <div>
                    Offers:
                    {
                        props.offers.map((offer: any, index: number) => {
                            return <div key={offer.name}><div>
                                {offer.name} - {offer.price} TON
                            </div>
                                <MiniButton name='Buy' onClick={handleBuy} />
                            </div>
                        })
                    }
                </div>
            }

        </div>
    )

}

export default GamerItem;