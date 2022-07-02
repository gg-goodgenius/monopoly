import GamerItem from '../gamerItem/GamerItem';
import './GamersList.css'

function GamersList() {

    return (
        <div className="panel">
            <div className="header">
                Gamers
            </div>
            <div className="gamers">
                <GamerItem name={'Gamer 1'} active={false}/>
                <GamerItem name={'Gamer 2'} active={true}/>
                <GamerItem name={'Gamer 3'} active={false}/>
            </div>
        </div>
    )

}

export default GamersList;