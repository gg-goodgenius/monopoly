import { MiniButton } from '../shared/button';
import './GamerItem.css'

function GamerItem(props: any) {
    const is_active: string = props.active ? "active " : ""
    return (
        <div key={props.name}>
            <div className={is_active + "gamerItem"} >
                {props.name} - {props.balance} TON
            </div>
            {props.offers &&
                <div>
                    Offers:
                    {
                        props.offers.map((offer: any, index: number) => {
                            return <div key={offer.name}><div>
                                {offer.name} - {offer.price} TON
                            </div>
                                <MiniButton name='Buy' />
                            </div>
                        })
                    }
                </div>
            }

        </div>
    )

}

export default GamerItem;