import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ReusableLinkComponent = (props) => {
    return(
        <Link role="button" to={props.linkTo} className="btn btn-primary mt-2 mt-xl-0">{props.headButton}</Link>
    )
}

export default ReusableLinkComponent;