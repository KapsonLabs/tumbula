import React from "react";

import NavComponent from "./nav";
import StoreOwnerSideBar from "./pages/store-owner-sidebar";
import StoreProfileSettingsComponent from "./pages/store-profile-settings";

class StoreProfileSettings extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <StoreOwnerSideBar/>
                    <StoreProfileSettingsComponent/>
                </div>
            </div>
        </>;
    }
}

export default StoreProfileSettings;