import React from "react";

import FooterComponent from "../footer";
import HeadBannerComponent from "../baby-components/headbanner";
import StoreFormComponent from "../baby-components/storeform";
import FormOuterComponent from "../baby-components/form-outer-component";
import FormMinorComponent from "../baby-components/form-minor-component";
import ReusableButtonComponent from "../baby-components/reusablebuttoncomponent";

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
                    <FormOuterComponent
                        formTitle={"Store Creation Form"}
                    >
                        <div className="row">
                            <FormMinorComponent
                                label={"First Name"}
                            >
                            </FormMinorComponent>
                            <FormMinorComponent
                                label={"Last Name"}
                            >
                            </FormMinorComponent>
                        </div>
                        <div className="row">
                            <FormMinorComponent
                                label={"Address"}
                            >
                            </FormMinorComponent>
                            <FormMinorComponent
                                label={"Location"}
                            >
                            </FormMinorComponent>
                        </div>
                        <div className="row">
                            <ReusableButtonComponent
                                type={"button"}
                                className={"btn btn-outline-secondary btn-lg"}
                                label={"Submit"}
                            >
                            </ReusableButtonComponent>
                        </div>
                    </FormOuterComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoresCreatorBody;