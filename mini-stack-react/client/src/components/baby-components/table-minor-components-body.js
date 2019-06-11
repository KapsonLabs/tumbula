import React from "react";

const TableBodyMinor = (props) => {
    return (
        <td className={props.className}> {props.title} 
            {props.children}
        </td>
    )
}

export default TableBodyMinor;