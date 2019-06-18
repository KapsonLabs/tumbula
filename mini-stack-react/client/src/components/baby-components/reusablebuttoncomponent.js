import React from "react";

const ReusableButtonComponent = (props) => {
    return(
        <button type={props.type} className={props.className} onClick={props.onClick}>{props.label}</button>
    )
}

export default ReusableButtonComponent;