import React from "react";

const FormMinorComponent = (props) => {
    return(
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">{props.label}</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" name={props.name} placeholder={props.placeHolder} value={props.value} onChange={props.onChange}/>
                </div>
            </div>
        </div>
    )
}

export default FormMinorComponent;