import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import StoresCreatorBody from "./pages/stores-create";

class StoresCreationPage extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <StoresCreatorBody/>
                </div>
            </div>
        </>;
    }
}

export default StoresCreationPage;