
function TaxField(props:any) {
    if (props.lux) {
        return <div className="space fee luxury-tax">
            <div className="container">
                <div className="name">Luxury Tax</div>
                <div className="drawing fa fa-diamond"></div>
                <div className="instructions">Pay $75.00</div>
            </div>
        </div>
    }
    else {
        return <div className="space fee income-tax">
            <div className="container">
                <div className="name">Income Tax</div>
                <div className="diamond"></div>
                <div className="instructions">PAY 2 TON</div>
            </div>
        </div>
    }
}

export default TaxField;