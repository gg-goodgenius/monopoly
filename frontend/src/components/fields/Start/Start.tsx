import UserLabel from '../UserLabel/UserLabel';

function StartField(props: any) {
	return (
		<div className="space corner go">
			<UserLabel id={props.id} />
			<div className="container">
				<div className="instructions">Collect 2 TON salary as you pass</div>
				<div className="go-word">go</div>
			</div>
			<div className="arrow fa fa-long-arrow-left"></div>
		</div>
	)

}

export default StartField;