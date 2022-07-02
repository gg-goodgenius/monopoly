import "./button.css"
export function Button(props: any) {
    return (
        <div className="button" onClick={props.onClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {props.name}
        </div>
    )
}

export function MiniButton(props: any) {
    return (
        <div className="button mini" onClick={props.onClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {props.name}
        </div>
    )
}
