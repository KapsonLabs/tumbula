import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SidebarLinkComponent = (props) =>{
    return(
        <li className={props.liClassName}>
            <Link className={props.liLinkClassName} to={props.linkTo}>
                <i className={props.iconClassName}></i>
                <span className={props.spanClassName}>{props.spanName}</span>
            </Link>
        </li>
    )
}

export default SidebarLinkComponent;