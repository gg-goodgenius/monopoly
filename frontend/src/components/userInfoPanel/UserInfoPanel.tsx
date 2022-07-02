import "./UserInfoPanel.css"

function UserInfoPanel(props: any) {
    return (
        <div className="panel">
               <div className="header">
                User info
               </div>
               <div>
                Wallet: {props.wallet}
               </div>
               <div>
                Balance: {props.balance} TON
               </div>
        </div>
    )

}

export default UserInfoPanel;