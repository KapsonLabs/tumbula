import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import ApplicationMonitor from "./pages/application-monitor";

class ApplicationManager extends React.Component{
    render(){
        return <>
            <div class="container-scroller">
                <NavComponent/>
                <div class="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <ApplicationMonitor/>
                </div>
            </div>
        </>;
    }
}

export default ApplicationManager;