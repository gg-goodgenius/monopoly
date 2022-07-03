import UserLabel from '../UserLabel/UserLabel';

function RailRoadField(props:any) {
	return (
		<div className="space railroad">
			<UserLabel id={props.id} />
			<div className="container">
				<div className="name">{props.name}</div>
				<i className="drawing fa fa-subway"></i>
				<div className="price">Price 2 TON</div>
			</div>
		</div>
	)

}

export default RailRoadField;