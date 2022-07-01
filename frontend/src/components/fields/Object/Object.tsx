interface boardFieldType {
    color: string;
    name: string;
    price: number;
}


function BoardField(props: boardFieldType) {
    const gridArea = (id: number) => {
        let x = 0
        let y = 0
        if (0 <= id && id < 9) {
            x = 11
            y = 10 - id
        }
        if (9 <= id && id < 18) {
            x = 10 - id % 9
            y = 1
        }
        if (18 <= id && id < 27) {
            x = 1
            y = id % 9 + 2
        }
        if (27 <= id && id < 36) {
            x = id % 9 + 2
            y = 11
        }

        return x.toString() + " / " + y.toString()
    }

    return (
        <div className="space property">
            <div className="container">
                <div className={"color-bar "+props.color}></div>
                <div className="name">{props.name}</div>
                <div className="price">PRICE {props.price} TON</div>
            </div>
        </div>
    )

}

export default BoardField;