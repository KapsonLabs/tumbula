import React from "react";

const TableBodyComponent = (props) => {
    return(
        <tbody>
            <tr key={props.key}>
                {props.children}
            </tr>
        </tbody>
        )
    }

export default TableBodyComponent;