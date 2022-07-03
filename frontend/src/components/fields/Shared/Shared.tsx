import UserLabel from '../UserLabel/UserLabel';

function SharedField(props: any) {
    if (props.electric) {
        return (
            <div className="space utility electric-company">
                <UserLabel id={props.id} />
                <div className="container">
                    <div className="name">Electric Company</div>
                    <i className="drawing fa fa-lightbulb-o"></i>
                    <div className="price">Price $150</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="space utility waterworks">
                <UserLabel id={props.id} />
                <div className="container">
                    <div className="name">Waterworks</div>
                    <i className="drawing fa fa-tint"></i>
                    <div className="price">Price $120</div>
                </div>
            </div>
        )
    }


}

export default SharedField;