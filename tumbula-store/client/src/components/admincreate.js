import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import AdminCreateBody from "./pages/admin-create";

class AdminCreationPage extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <AdminCreateBody/>
                </div>
            </div>
        </>;
    }
}

export default AdminCreationPage;