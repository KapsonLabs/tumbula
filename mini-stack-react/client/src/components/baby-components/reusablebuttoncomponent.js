import React from "react";

const ReusableButtonComponent = (props) => {
    return(
        <button type={props.type} className={props.className}>{props.label}</button>
    )
}

export default ReusableButtonComponent;