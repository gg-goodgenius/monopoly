import UserLabel from '../UserLabel/UserLabel';

function TaxField(props:any) {
    if (props.lux) {
        return <div className="space fee luxury-tax">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Luxury Tax</div>
                <div className="drawing fa fa-diamond"></div>
                <div className="instructions">Pay $75.00</div>
            </div>
        </div>
    }
    else {
        return <div className="space fee income-tax">
            <UserLabel id={props.id} />
            <div className="container">
                <div className="name">Income Tax</div>
                <div className="diamond"></div>
                <div className="instructions">PAY 2 TON</div>
            </div>
        </div>
    }
}

export default TaxField;