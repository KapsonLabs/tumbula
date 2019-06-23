import React from "react";

const LoaderComponent = (props) => {
    return (
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
            <p>{props.title}</p>
        </div>
    )
}

export default LoaderComponent;