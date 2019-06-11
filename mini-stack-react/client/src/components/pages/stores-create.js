import React from "react";

import FooterComponent from "../footer";
import HeadBannerComponent from "../baby-components/headbanner";
import StoreFormComponent from "../baby-components/storeform";

class StoresCreatorBody extends React.Component{
    render(){
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Store Creation"}
                        bannerWords={"Add stores to Mini-Cart"}
                        // headButton={"Add New Store"}
                        >
                    </HeadBannerComponent>
                    <StoreFormComponent/>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoresCreatorBody;