import { MiniButton } from '../shared/button';
import './GamerItem.css'

function GamerItem(props: any) {
    const is_active: string = props.active ? "active " : ""
    return (
        <>
            <div className={is_active + "gamerItem"}>
                {props.name} - {props.balance} TON
            </div>
            {props.offers &&
                <div>
                    Offers:
                        {
                            props.offers.map((offer:any, index:number) => {
                                return <><div>
                                    {offer.name} - {offer.price} TON
                                </div>
                                <MiniButton name='Buy'/>
                                </>
                            })
                        }
                </div>
            }

        </>
    )

}

export default GamerItem;