import UserLabel from '../UserLabel/UserLabel';

function GoJailField(props: any) {
    return (
        <div className="space corner go-to-jail">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Go To</div>
                <i className="drawing fa fa-gavel"></i>
                <div className="name">Jail</div>
            </div>
        </div>
    )
}

export default GoJailField;