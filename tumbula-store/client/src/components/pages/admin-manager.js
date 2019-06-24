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

class AdminManager extends React.Component{

    constructor(props){
        super(props)

        this.state={
            storeInstance: undefined,
            account: null,
            web3: null,
            admins: []
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

        this.state.storeInstance.events.roleAdded({fromBlock: 0, toBlock: 'latest'})
        .on('data', function(event){
          console.log(event); // same results as the optional callback above
          var newAdminsArray = component.state.admins.slice()
          newAdminsArray.push(event.returnValues)
          component.setState({ admins: newAdminsArray })
        })
        .on('error', console.error);
      }

    renderTableData() {
        return this.state.admins.map((admin, index) => {
            const {id, role_address, added_by} = admin
            return (
                <TableBodyComponent key={id}>
                    <TableBodyMinor title={role_address}>
                    </TableBodyMinor>
                    <TableBodyMinor title={added_by}>
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
                        bannerHead={"Admins Manager"}
                        bannerWords={"Manage all admins on the Application here"}
                        >
                        <ReusableLinkComponent
                            headButton={"Add New Admin"}
                            linkTo={"/admincreate"}
                        >
                        </ReusableLinkComponent>
                    </HeadBannerComponent>


                    <HoverableTableComponent
                       cardTitle={"Admins"} 
                    >
                        <TableHeadComponent>
                            <TableHeadMinor title={"Admin Address"}>
                            </TableHeadMinor>
                            <TableHeadMinor title={"Added By"}>
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

export default AdminManager;