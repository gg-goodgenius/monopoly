import "./WalletInfo.css"
import { useContext } from "react";
import { StateContext } from './../../context/State'



function WalletInfo() {
    const { profile } = useContext<any>(StateContext)

    return (
        <div className="panel">
            <div className="header">
                Wallet ifno
            </div>
            {profile &&
                <>
                    <div>
                        Address: {profile && profile.shortAddress}
                    </div>
                    <div>
                        Balance: {profile && profile.balance} TON
                    </div>
                    <div>
                        TONScan: <a href={"https://testnet.tonscan.org/address/"+profile.address} target='_blank'>click</a>
                    </div>
                </>
            }


        </div>
    )

}

export default WalletInfo;