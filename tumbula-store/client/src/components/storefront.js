import React from "react";

import NavComponent from "./nav";
import StoreOwnerSideBar from "./pages/store-owner-sidebar";
import StoreFrontComponent from "./pages/store-fronts";

class StoreFront extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <StoreOwnerSideBar/>
                    <StoreFrontComponent/>
                </div>
            </div>
        </>;
    }
}

export default StoreFront;