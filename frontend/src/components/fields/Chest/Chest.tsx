import UserLabel from '../UserLabel/UserLabel';

function ChestField(props:any) {

    return (
        <div className="space community-chest">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Community Chest</div>
                <i className="drawing fa fa-cube"></i>
                <div className="instructions">Follow instructions on top card</div>
            </div>
        </div>
    )

}

export default ChestField;