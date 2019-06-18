import React from "react";
import { Redirect } from 'react-router-dom'

import FooterComponent from "../footer";
import HeadBannerComponent from "../baby-components/headbanner";
import FormOuterComponent from "../baby-components/form-outer-component";
import FormMinorComponent from "../baby-components/form-minor-component";
import ReusableButtonComponent from "../baby-components/reusablebuttoncomponent";

import getWeb3 from "../../utils/getWeb3";
import TumbulaStoreContract from "../../contracts/TumbulaStore.json";

class StoresCreatorBody extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
          storeInstance: undefined,
          account: null,
          web3: null,
          firstName: '',
          lastName: '',
          redirect: false
        };
        
        this.handleChange = this.handleChange.bind(this)
        this.handleStoreCreation = this.handleStoreCreation.bind(this)

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
     
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.log(error);
        }
      };

    //set redirect state to true
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    //handle the actual redirect
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/stores' />
        }
    }

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
                        <form className="form-sample" onSubmit={this.handleStoreCreation}>
                            <div className="row">
                                <FormMinorComponent
                                    label={"First Name"}
                                    placeHolder={"Please Enter First Name"}
                                    name={"firstName"}
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
                                <FormMinorComponent
                                    label={"Last Name"}
                                    placeHolder={"Please Enter Last Name"}
                                    name={"lastName"}
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
                            </div>
                            <div className="row">
                                {/* {this.renderRedirect()} */}
                                <ReusableButtonComponent
                                    type={"submit"}
                                    className={"btn btn-outline-secondary btn-lg"}
                                    label={"Submit"}
                                    // onClick={this.setRedirect}
                                >
                                </ReusableButtonComponent>
                            </div>
                        </form>
                    </FormOuterComponent>
                </div>
                <FooterComponent/>
            </div>
        );
    }


    handleChange(event){

        switch(event.target.name) {
            case "firstName":
                this.setState({"firstName": event.target.value})
                break;
            case "lastName":
                this.setState({"lastName": event.target.value})
                break;
            default:
                break;
        }
    }

    // Handle form submit

    async handleStoreCreation(event)
        {
            if (typeof this.state.storeInstance !== 'undefined') {
                event.preventDefault();
                await this.state.storeInstance.methods.addStoreOwner(this.state.firstName,this.state.lastName).send({ from: this.state.account})
        }
    }
}

export default StoresCreatorBody;