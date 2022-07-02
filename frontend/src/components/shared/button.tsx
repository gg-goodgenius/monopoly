import "./button.css"
function Button(props: any) {
    return (
        <div className="button" onClick={props.handleClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {props.name}
        </div>
    )

}

export default Button;