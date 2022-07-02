import "./button.css"
function Button(props: any) {
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

export default Button;