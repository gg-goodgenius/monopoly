import UserLabel from '../UserLabel/UserLabel';

function ChanceField(props:any) {
    return (
        <div className="space chance">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Chance</div>
                <i className="drawing fa fa-question"></i>
            </div>
        </div>
    )

}

export default ChanceField;