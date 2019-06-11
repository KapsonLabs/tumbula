import React from "react";

import NavComponent from "./nav";
import StoreOwnerSideBar from "./pages/store-owner-sidebar";
import StoreProductAuctionComponent from "./pages/store-product-auction";

class StoreProductAuction extends React.Component{
    render(){
        return <>
            <div className="container-scroller">
                <NavComponent/>
                <div className="container-fluid page-body-wrapper">
                    <StoreOwnerSideBar/>
                    <StoreProductAuctionComponent/>
                </div>
            </div>
        </>;
    }
}

export default StoreProductAuction;