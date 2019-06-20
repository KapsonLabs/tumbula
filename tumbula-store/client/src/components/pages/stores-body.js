import React from "react";

import HoverableTableComponent from "../baby-components/table-hoverable-table";
import TableHeadComponent from "../baby-components/table-head";
import TableBodyComponent from "../baby-components/table-body";
import TableBodyMinor from "../baby-components/table-minor-components-body";
import TableHeadMinor from "../baby-components/table-minor-components-head";
import FooterComponent from "../footer";
import HeadBannerComponent from "../baby-components/headbanner";
import ReusableLinkComponent from "../baby-components/reusablelinkcomponent";

import getWeb3 from "../../utils/getWeb3";
import TumbulaStoreContract from "../../contracts/TumbulaStore.json";
import { isUndefined } from "util";

class StoresBody extends React.Component{

    constructor(props){
        super(props)

        this.state={
            storeInstance: undefined,
            account: null,
            web3: null,
            storeOwners: []
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
          //   console.log(this.state.account)
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

        this.state.storeInstance.events.storeOwnerCreated({fromBlock: 0, toBlock: 'latest'})
        .on('data', function(event){
          console.log(event); // same results as the optional callback above
          var newStoresArray = component.state.storeOwners.slice()
          newStoresArray.push(event.returnValues)
          component.setState({ storeOwners: newStoresArray })
        })
        .on('error', console.error);
      }

    renderTableData() {
        return this.state.storeOwners.map((storeOwner, index) => {
            const {id, first_name, last_name, email} = storeOwner
            return (
                <TableBodyComponent key={id}>
                    <TableBodyMinor title={first_name}>
                    </TableBodyMinor>
                    <TableBodyMinor title={last_name}>
                    </TableBodyMinor>
                    <TableBodyMinor title={email}>
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
                        bannerHead={"Admin Store Manager"}
                        bannerWords={"Manage all stores on the Application here"}
                        >
                        <ReusableLinkComponent
                            headButton={"Add New Store"}
                            linkTo={"/addstore"}
                        >
                        </ReusableLinkComponent>
                    </HeadBannerComponent>


                    <HoverableTableComponent
                       cardTitle={"Store Fronts"} 
                    >
                        <TableHeadComponent>
                            <TableHeadMinor title={"First Name"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Last Name"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Address"}>
                            </TableHeadMinor>
                        </TableHeadComponent>
                        {this.renderTableData()}
                    </HoverableTableComponent>

                    
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default StoresBody;