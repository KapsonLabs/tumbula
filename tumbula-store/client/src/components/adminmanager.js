import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import AdminManager from "./pages/admin-manager";

class AdminManagerPage extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <AdminManager/>
                </div>
            </div>
        </>;
    }
}

export default AdminManagerPage;