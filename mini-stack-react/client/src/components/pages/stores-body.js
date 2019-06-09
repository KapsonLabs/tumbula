import React from "react";

import FooterComponent from "../footer";
import TableComponent from "../baby-components/table";
import HeadBannerComponent from "../baby-components/headbanner";

class StoresBody extends React.Component{
    render(){
        return(
            <div class="main-panel">
                <div class="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Store Manager"}
                        bannerWords={"Manage all stores on the Application here"}
                        headButton={"Add New Store"}
                        >
                    </HeadBannerComponent>
                    <TableComponent
                        tableTitle={"Stores List"}
                    >
                    </TableComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoresBody;