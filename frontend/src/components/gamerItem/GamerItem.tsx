import './GamerItem.css'

function GamerItem(props: any) {
    const is_active:string = props.active ? "active " : ""
    return (
        <div className={is_active + "gamerItem"}>
               {props.name}
        </div>
    )

}

export default GamerItem;