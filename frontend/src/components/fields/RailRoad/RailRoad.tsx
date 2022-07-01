
interface railRoadProps {
	name: string;
}

function RailRoadField(props:railRoadProps) {
	return (
		<div className="space railroad">
			<div className="container">
				<div className="name">{props.name}</div>
				<i className="drawing fa fa-subway"></i>
				<div className="price">Price 2 TON</div>
			</div>
		</div>
	)

}

export default RailRoadField;