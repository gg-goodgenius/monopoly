import "./WalletInfo.css"
import { useContext } from "react";
import { StateContext } from './../../context/State'



function WalletInfo() {
    const { profile, user, payment } = useContext<any>(StateContext)
    const color = user ? user.color : "#fff"
    return (
        <div className="panel">
            <div className="header">
                Wallet info
            </div>
            {profile &&
                <>
                    <div style={{ color: color }}>
                        Address: {profile && profile.shortAddress}
                    </div>
                    <div>
                        Balance: {profile && profile.balance} TON
                    </div>
                    <div>
                        TONScan (wallet): <a href={"https://testnet.tonscan.org/address/" + profile.address} target='_blank'>click</a>
                    </div>
                    {payment?.address &&
                        <div>
                            TONScan (payments channel): <a href={"https://testnet.tonscan.org/address/" + payment?.address} target='_blank'>click</a>
                        </div>
                    }
                </>
            }


        </div>
    )

}

export default WalletInfo;