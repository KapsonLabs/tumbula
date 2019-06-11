import React from "react";

const TableBodyComponent = (props) => {
    return(
        <tbody>
            <tr>
                {props.children}
            </tr>
        </tbody>
        )
    }

export default TableBodyComponent;