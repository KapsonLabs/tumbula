import React from "react";

import NavComponent from "./nav";
import StoreOwnerSideBar from "./pages/store-owner-sidebar";
import StoreFundTransferComponent from "./pages/store-funds-transfer";

class StoreFundsTransfer extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <StoreOwnerSideBar/>
                    <StoreFundTransferComponent/>
                </div>
            </div>
        </>;
    }
}

export default StoreFundsTransfer;