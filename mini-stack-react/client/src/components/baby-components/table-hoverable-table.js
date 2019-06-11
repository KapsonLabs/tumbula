import React from "react";

const HoverableTableComponent = (props) =>{
    return(
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{props.cardTitle}</h4>
                    <div class="table-responsive">
                    <table class="table table-hover">
                        {props.children}
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HoverableTableComponent;