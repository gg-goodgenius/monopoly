import { Button } from "../shared/button";
import "./ActionPanel.css"
import { useContext, useEffect, useState } from "react";
import { StateContext } from './../../context/State'
import QRCode from "react-qr-code";
import HyperModal from 'react-hyper-modal';
// 9a4aa927c95c7899492288487862a0d59335b1dd604bd732a102da6dd47520db2f02a0b14f0e963e1533660ae18f80154048d7783a0ce9e8c8ab6955234f8c2d
function ActionPanel(props: any) {
    const { profile, socket, payment } = useContext<any>(StateContext)
    const [visibleQRLink, setVisibleQRLink] = useState(false)
    const [join, setJoin] = useState(false)

    const handleAddBalance = () => {
        setVisibleQRLink(true)
    }

    const handleJoin = () => {
        socket.emit("joinGame")        
        setJoin(true)
    }

    const handleStart = () => {
        socket.emit("startGame")

    }

    const handleRollCubes = () => {
        socket.emit("startStep")
    }
    
    const handlePayRent = () => {
        socket.emit("doActionStep")
    }

    const handleBuy = () => {
        socket.emit("doActionStep", "buy")
    }

    const handleFinish = () => {
        socket.emit("finishStep")
    }
    const handleFinishGame = () => {
        socket.emit("finishGame")
    }

    return (
        <div className="panel">
            <div className="header">
                Action panel
            </div>
            <Button name='Add balance (+15TON)' onClick={handleAddBalance} /><br/>
            {join &&
                <><Button name='Start Game' onClick={handleStart} /><br/></>
            }
            {!join &&
                <><Button name='Join Game' onClick={handleJoin} /><br/></>
            }
            <Button name='Roll cubes' onClick={handleRollCubes} /><br/>
            <Button name='Buy' onClick={handleBuy} /><br/>
            <Button name='Pay rent' onClick={handlePayRent} /><br/>
            <Button name='Finish' onClick={handleFinish} /><br/>
            <Button name='Finish Game' onClick={handleFinishGame} /><br/>

            {visibleQRLink && profile &&
                <HyperModal
                    isOpen={visibleQRLink}
                    requestClose={() => { setVisibleQRLink(false) }}
                >
                    <div className="addBalance">
                        <div><h1>Scan QR code with TON Keeper or click link</h1></div>
                        <div>
                            <QRCode className="addBalanceQR" size={300} level={'M'} value={"https://app.tonkeeper.com/transfer/" + profile.address + "?amount=15000000000&text=add%20balance%20Tonopoly"} />
                        </div>
                        <div><a href={"https://app.tonkeeper.com/transfer/" + profile.address + "?amount=15000000000&text=add%20balance%20Tonopoly"}>Click</a></div>
                    </div>
                </HyperModal>
            }

        </div>
    )

}

export default ActionPanel;