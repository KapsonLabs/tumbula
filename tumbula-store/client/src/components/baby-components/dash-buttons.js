import React from "react";

const DashboardButtonComponent = (props) => {
    return(
        <button type="button" className="btn btn-light bg-white btn-icon mr-3 d-none d-md-block">
            <i className={props.iconClassName}></i>
        </button>
    ) 
}

export default DashboardButtonComponent;