import React from "react";

import HoverableTableComponent from "../baby-components/table-hoverable-table";
import TableHeadComponent from "../baby-components/table-head";
import TableBodyComponent from "../baby-components/table-body";
import TableBodyMinor from "../baby-components/table-minor-components-body";
import TableHeadMinor from "../baby-components/table-minor-components-head";
import FooterComponent from "../footer";
import DashboardButtonComponent from "../baby-components/dash-buttons";
import HeadBannerComponent from "../baby-components/headbanner";
import ReusableLinkComponent from "../baby-components/reusablelinkcomponent";

import getWeb3 from "../../utils/getWeb3";
import TumbulaStoreContract from "../../contracts/TumbulaStore.json";


class StoreFrontComponent extends React.Component{

    constructor(props) {
        super(props);
    
        this.state={
            storeInstance: undefined,
            account: null,
            web3: null,
            storeFronts: []
        }
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
     
     
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
     
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
              const deployedNetwork = TumbulaStoreContract.networks[networkId];
              const instance = new web3.eth.Contract(
                TumbulaStoreContract.abi,
                deployedNetwork && deployedNetwork.address,
              );
     
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ storeInstance: instance, web3: web3, account: accounts[0]})

          this.addEventListener(this)
     
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.log(error);
        }
    };

    addEventListener(component) {
        this.state.storeInstance.events.storeFrontCreated({fromBlock: 0, toBlock: 'latest'})
        .on('data', function(event){
            console.log(event); // same results as the optional callback above
            var newStoreFrontsArray = component.state.storeFronts.slice()
            newStoreFrontsArray.push(event.returnValues)
            component.setState({ storeFronts: newStoreFrontsArray })
        })
        .on('error', console.error);
    }

    renderTableData() {
        return this.state.storeFronts.map((storeFront, index) => {
            const {id, storename, storelocation, storemerchandise} = storeFront
            return (
                <TableBodyComponent key={id}>
                    <TableBodyMinor title={storename}>
                    </TableBodyMinor>
                    <TableBodyMinor title={storelocation}>
                    </TableBodyMinor>
                    <TableBodyMinor title={storemerchandise}>
                    </TableBodyMinor>
                </TableBodyComponent>
            )
        })
    }

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
                        <ReusableLinkComponent
                            headButton={"Create Store Front"}
                            linkTo={"/storefontcreate"}
                        >
                        </ReusableLinkComponent>
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
                            {/* <TableHeadMinor title={"Status"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Actions"}>
                            </TableHeadMinor> */}
                        </TableHeadComponent>
                        {/* <TableBodyComponent>
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
                        </TableBodyComponent> */}
                        {this.renderTableData()}
                    </HoverableTableComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoreFrontComponent;