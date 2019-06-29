import React from "react";

import NavComponent from "./nav";
import StoreOwnerSideBar from "./pages/store-owner-sidebar";
import StoreOwnerDashboardComponent from "./pages/store-dash";

class StoreOwnerDashboard extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <StoreOwnerSideBar/>
                    <StoreOwnerDashboardComponent/>
                </div>
            </div>
        </>;
    }
}

export default StoreOwnerDashboard;