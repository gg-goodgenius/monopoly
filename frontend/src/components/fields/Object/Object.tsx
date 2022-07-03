import UserLabel from '../UserLabel/UserLabel';

interface boardFieldType {
    id: number;
    color: string;
    name: string;
    price: number;
    type:string;
    level: number;
}


function BoardField(props: boardFieldType) {
    return (
        <div className="space property">
            <UserLabel id={props.id} />
            <div className="container">
                <div className={"color-bar "+props.color}>{"Level: " + props.level}</div>
                <div className="name long-name">{props.name}</div>
                <div className="price">{props.price} TON</div>
            </div>
        </div>
    )

}

export default BoardField;