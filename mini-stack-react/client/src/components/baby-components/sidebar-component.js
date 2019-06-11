import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const SidebarComponent = (props) => 
    <nav className={props.sidebarClass} id={props.sidebarId}>
        <ul className={props.navClass}>
            {props.children}
        </ul>
    </nav>;

export default SidebarComponent;