interface boardFieldType {
    color: string;
    name: string;
    price: number;
}


function BoardField(props: boardFieldType) {
    return (
        <div className="space property">
            <div className="container">
                <div className={"color-bar "+props.color}></div>
                <div className="name long-name">{props.name}</div>
                <div className="price">{props.price} TON</div>
            </div>
        </div>
    )

}

export default BoardField;