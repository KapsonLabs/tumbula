import React from "react";

import NavComponent from "./nav";
import SideComponent from "./sidebar";
import StoreFrontCreatorBody from "./pages/store-front-create";

class StoreFrontsCreationPage extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <SideComponent/>
                    <StoreFrontCreatorBody/>
                </div>
            </div>
        </>;
    }
}

export default StoreFrontsCreationPage;