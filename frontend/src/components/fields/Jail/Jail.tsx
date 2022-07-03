import UserLabel from "../UserLabel/UserLabel";

function JailField(props:any) {

    return (
        <div className="space corner jail">
			<UserLabel id={props.id} />
			<div className="just">Just</div>
			<div className="drawing">
				<div className="container">
					<div className="name">In</div>
					<div className="window">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
						<i className="person fa fa-frown-o"></i>
					</div>
					<div className="name">Jail</div>
				</div>
			</div>
			<div className="visiting">Visiting</div>
		</div>
    )

}

export default JailField;