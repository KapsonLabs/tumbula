import React from "react";

const FormOuterComponent = (props) => {
    return(
        <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.formTitle}</h4>
                    <form className="form-sample">
                    {/* <p className="card-description">
                        Personal info
                    </p> */}
                        {props.children}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default FormOuterComponent;