import React from "react";

import FooterComponent from "../footer";
import DashboardButtonComponent from "../baby-components/dash-buttons";
import HeadBannerComponent from "../baby-components/headbanner";

class StoreProfileSettingsComponent extends React.Component{
    render(){
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Profile Manager"}
                        bannerWords={"Manage all your profile on the Application here"}
                        headButton={"Edit Profile"}
                        linkTo={"/addstore"}
                        >
                        <DashboardButtonComponent
                            iconClassName={"mdi mdi-download text-muted"}
                        ></DashboardButtonComponent>
                        <DashboardButtonComponent
                            iconClassName={"mdi mdi-clock-outline text-muted"}
                        ></DashboardButtonComponent>
                        <DashboardButtonComponent
                            iconClassName={"mdi mdi-plus text-muted"}
                        ></DashboardButtonComponent>
                    </HeadBannerComponent>

                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoreProfileSettingsComponent;