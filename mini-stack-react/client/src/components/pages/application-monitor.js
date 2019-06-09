import React from "react";

import FooterComponent from "../footer";
import TableComponent from "../baby-components/table";
import HeadBannerComponent from "../baby-components/headbanner";

class ApplicationMonitor extends React.Component{
    render(){
        return(
            <div class="main-panel">
                <div class="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Application Monitor"}
                        bannerWords={"Monitor the application's workflow and health here"}
                        headButton={"Add New Store"}
                        >
                    </HeadBannerComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default ApplicationMonitor;