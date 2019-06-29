import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import DashboardComponent from "./dash";

class AdminDashboard extends React.Component{
    render(){
        return(
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <DashboardComponent/>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;