import React from "react";

import FooterComponent from "./footer";
import TableComponent from "./baby-components/table";
import DashboardButtonComponent from "./baby-components/dash-buttons";
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