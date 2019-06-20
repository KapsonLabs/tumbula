import React from "react";
import SidebarComponent from "../baby-components/sidebar-component";
import SidebarLinkComponent from "../baby-components/sidebar-links-component";

class StoreOwnerSideBar extends React.Component{
    render(){
        return(
            <SidebarComponent
                sidebarClass={"sidebar sidebar-offcanvas"}
                sidebarId={"sidebar"}
                navClass={"nav"}
            >
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/store_owner"}
                    iconClassName={"mdi mdi-home menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Dashboard"}
                >
                </SidebarLinkComponent>
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/store_front"}
                    iconClassName={"mdi mdi-cart menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Store Fronts"}
                >
                </SidebarLinkComponent>
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/store_auction"}
                    iconClassName={"mdi mdi-chart-gantt menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Product Auctions"}
                >
                </SidebarLinkComponent>
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/funds_transfer"}
                    iconClassName={"mdi mdi-cash-100 menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Funds Transfer"}
                >
                </SidebarLinkComponent>
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/ratings"}
                    iconClassName={"mdi mdi-dice-d20 menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Ratings and Favorites"}
                >
                </SidebarLinkComponent>
                <SidebarLinkComponent
                    liClassName={"nav-item"}
                    liLinkClassName={"nav-link"}
                    linkTo={"/profile_settings"}
                    iconClassName={"mdi mdi-account-key menu-icon"}
                    spanClassName={"menu-title"}
                    spanName={"Profile Settings"}
                >
                </SidebarLinkComponent>
            </SidebarComponent>
        )
    }
}

export default StoreOwnerSideBar;