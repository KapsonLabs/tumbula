import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import StoresBody from "./pages/stores-body";

class StoresPage extends React.Component{
    render(){
        return <>
            <div class="container-scroller">
                <NavComponent/>
                <div class="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <StoresBody/>
                </div>
            </div>
        </>;
    }
}

export default StoresPage;