import React from "react";

const HoverableTableComponent = (props) =>{
    return(
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.cardTitle}</h4>
                    <div className="table-responsive">
                    <table className="table table-hover">
                        {props.children}
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HoverableTableComponent;