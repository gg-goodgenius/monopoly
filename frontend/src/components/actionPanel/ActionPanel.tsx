import Button from "../shared/button";
import "./ActionPanel.css"
import wallet from '../../lib/ton'


function ActionPanel(props: any) {
        
    return (
        <div className="panel">
               <div className="header">
                Action panel
               </div>
               <Button name='Add balance (+15TON)' />
               <Button name='Update wallet info'/>
        </div>
    )

}

export default ActionPanel;