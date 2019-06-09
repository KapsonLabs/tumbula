import React from "react";

import FooterComponent from "./footer";
import TableComponent from "./baby-components/table";
import HeadBannerComponent from "./baby-components/headbanner";
import StatisticsCardComponent from "./baby-components/statisticscards";
import CardsComponent from "./baby-components/cards";

class DashboardComponent extends React.Component{
    render(){
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Admin Dashboard"}
                        bannerWords={"Administrator Analytics Dashboard"}
                        headButton={"Download Report"}
                        >
                    </HeadBannerComponent>
                    <StatisticsCardComponent/>
                    <CardsComponent/>
                    <TableComponent
                        tableTitle={"Recent Transactions"}
                    >
                    </TableComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default DashboardComponent;