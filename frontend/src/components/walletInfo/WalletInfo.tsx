import "./WalletInfo.css"

function WalletInfo(props: any) {
    return (
        <div className="panel">
               <div className="header">
                User info
               </div>
               <div>
                Address: {props.address}
               </div>
               <div>
                Balance: {props.balance} TON
               </div>
        </div>
    )

}

export default WalletInfo;