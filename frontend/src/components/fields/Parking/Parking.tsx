import UserLabel from '../UserLabel/UserLabel';


function ParkingField(props:any) {
    return (
        <div className="space corner free-parking">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Free</div>
                <i className="drawing fa fa-car"></i>
                <div className="name">Parking</div>
            </div>
        </div>
    )
}

export default ParkingField;