import { Button } from "../shared/button";
import "./ActionPanel.css"
import { useContext, useEffect, useState } from "react";
import { StateContext } from './../../context/State'
import QRCode from "react-qr-code";
import HyperModal from 'react-hyper-modal';

function ActionPanel(props: any) {
    const { profile } = useContext<any>(StateContext)
    const [ visibleQRLink, setVisibleQRLink ] = useState(false)

    const handleAddBalance = () => {
        setVisibleQRLink(true)
    }

    return (
        <div className="panel">
            <div className="header">
                Action panel
            </div>
            <Button name='Add balance (+15TON)' onClick={handleAddBalance} />
            <Button name='Join Game' onClick={handleAddBalance} />
            <Button name='Start Game' onClick={handleAddBalance} />
            <Button name='Roll cubes' onClick={handleAddBalance} />
            <Button name='Finish' onClick={handleAddBalance} />

            {visibleQRLink && profile &&
                <HyperModal
                isOpen={visibleQRLink}
                requestClose={()=>{setVisibleQRLink(false)}}
              >
                <div className="addBalance">
                    <div><h1>Scan QR code with TON Keeper or click link</h1></div>
                    <div>
                    <QRCode className="addBalanceQR" size={300}  level={'M'} value={"https://app.tonkeeper.com/transfer/" + profile.address + "?amount=15000000000&text=add%20balance%20Tonopoly"} />
                    </div>
                    <div><a href={"https://app.tonkeeper.com/transfer/" + profile.address + "?amount=15000000000&text=add%20balance%20Tonopoly"}>Click</a></div>
                </div>
                </HyperModal>
            }

        </div>
    )

}

export default ActionPanel;