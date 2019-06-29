import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import StoresBody from "./pages/stores-body";

class StoresPage extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <StoresBody/>
                </div>
            </div>
        </>;
    }
}

export default StoresPage;