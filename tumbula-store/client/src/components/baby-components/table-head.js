import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const TableHeadComponent = (props) => {
    return(
        <thead>
            <tr>
                {props.children}
            </tr>
        </thead>
    )
}

export default TableHeadComponent;