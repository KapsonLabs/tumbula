import React from "react";

import HoverableTableComponent from "../baby-components/table-hoverable-table";
import TableHeadComponent from "../baby-components/table-head";
import TableBodyComponent from "../baby-components/table-body";
import TableBodyMinor from "../baby-components/table-minor-components-body";
import TableHeadMinor from "../baby-components/table-minor-components-head";
import FooterComponent from "../footer";
import DashboardButtonComponent from "../baby-components/dash-buttons";
import HeadBannerComponent from "../baby-components/headbanner";

class StoreFrontComponent extends React.Component{
    render(){
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Store Fronts Manager"}
                        bannerWords={"Manage all your stores fronts on the Application here"}
                        headButton={"Add Store Front"}
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


                    <HoverableTableComponent
                       cardTitle={"Store Fronts"} 
                    >
                        <TableHeadComponent>
                            <TableHeadMinor title={"Store Name"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Merchandise"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Location"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Status"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Actions"}>
                            </TableHeadMinor>
                        </TableHeadComponent>
                        <TableBodyComponent>
                            <TableBodyMinor title={"Kikuubo"}>
                            </TableBodyMinor>
                            <TableBodyMinor title={"General"}>
                            </TableBodyMinor>
                            <TableBodyMinor title={"Kampala"}>
                            </TableBodyMinor>
                            <TableBodyMinor>
                                <label className="badge badge-danger">Suspended</label>
                            </TableBodyMinor>
                            <TableBodyMinor>
                                <DashboardButtonComponent iconClassName={"mdi mdi-settings text-muted"}>
                                </DashboardButtonComponent>
                            </TableBodyMinor>
                        </TableBodyComponent>
                        <TableBodyComponent>
                        <TableBodyMinor title={"Owino"}>
                            </TableBodyMinor>
                            <TableBodyMinor title={"Clothes"}>
                            </TableBodyMinor>
                            <TableBodyMinor title={"Kampala"}>
                            </TableBodyMinor>
                            <TableBodyMinor>
                                <label className="badge badge-success">Active</label>
                            </TableBodyMinor>
                            <TableBodyMinor>
                                <DashboardButtonComponent iconClassName={"mdi mdi-settings text-muted"}>
                                </DashboardButtonComponent>
                            </TableBodyMinor>
                        </TableBodyComponent>
                    </HoverableTableComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoreFrontComponent;