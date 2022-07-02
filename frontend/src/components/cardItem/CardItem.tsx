import './CardItem.css'


function CardItem(props: any) {
    let level = 'No update'
    if (props.level == 4) {
        level = 'Hotel'
    } else if (props.level == 0) {
        level = 'No builds'
    } else level = props.level + ' house'

    return (
        <div className="cardItem">
            <div className="name">
                <div className={"color " + props.color}></div>
                <div >{props.name}</div>
            </div>
            <div>Building: {level}</div>
            <div>Action: up, down, sell, to bank</div>
        </div>
    )

}

export default CardItem;