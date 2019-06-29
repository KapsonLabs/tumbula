import React from "react";
import { Redirect, withRouter } from 'react-router-dom'

import FooterComponent from "../footer";
import HeadBannerComponent from "../baby-components/headbanner";
import FormOuterComponent from "../baby-components/form-outer-component";
import FormMinorComponent from "../baby-components/form-minor-component";
import ReusableButtonComponent from "../baby-components/reusablebuttoncomponent";
import LoaderComponent from "../baby-components/loader-component";

import getWeb3 from "../../utils/getWeb3";
import TumbulaStoreContract from "../../contracts/TumbulaStore.json";

const etherscanBaseUrl = "https://rinkeby.etherscan.io"

class StoreFrontCreatorBody extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          storeInstance: undefined,
          account: null,
          web3: null,
          storeName: '',
          storeLocation: '',
          storeMerchandise: '',
          etherscanLink: "https://rinkeby.etherscan.io",
          loading: false
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

    handleChange(event){

        switch(event.target.name) {
            case "storeName":
                this.setState({"storeName": event.target.value})
            break;
            case "storeLocation":
                this.setState({"storeLocation": event.target.value})
                break;
            case "storeMerchandise":
                this.setState({"storeMerchandise": event.target.value})
                break;
            default:
                break;
        }
    }

    // Handle form submit

    async handleStoreCreation(event)
        {
            this.setState({ loading: true });
            if (typeof this.state.storeInstance !== 'undefined') {
                event.preventDefault();
                let result = await this.state.storeInstance.methods.addStoreFront(this.state.storeName,this.state.storeLocation,this.state.storeMerchandise).send({ from: this.state.account})
                this.setLastTransactionDetails(result)

                //Rudimentary create data envelope from event
                // let dataEnvelope = {
                //     username: result.events.storeOwnerCreated.returnValues.firstname,
                //     first_name: result.events.storeOwnerCreated.returnValues.firstname,
                //     last_name: result.events.storeOwnerCreated.returnValues.lastname,
                //     email: result.events.storeOwnerCreated.returnValues.email,
                //     password: result.events.storeOwnerCreated.returnValues.password,
                //     public_address: result.events.storeOwnerCreated.returnValues.storeowneraddress,
                //     role: 'STORE_OWNER'
                // }

                // this.saveResultToApi(dataEnvelope)
                this.loading = false;
                this.props.history.push('/store_front');
        }
    }

    setLastTransactionDetails(result)
        {
            if(result.tx !== 'undefined'){
                this.setState({etherscanLink: etherscanBaseUrl+"/tx/"+result.tx})
            }
            else{
                this.setState({etherscanLink: etherscanBaseUrl})
            }
    }

    // saveResultToApi(eventData){
    //     let formData  = new FormData();

    //     for(let name in eventData) {
    //         formData.append(name, eventData[name]);
    //       }

    //     fetch('http://localhost:8000/api/v1/auth/register/', {
    //         method: 'POST',
    //         body: formData
    //       })
    //       .then(res => {
    //         if (res.status === 201) {
    //           this.props.history.push('/stores');
    //         } else {
    //           const error = new Error(res.error);
    //           throw error;
    //         }
    //       })
    //       .catch(err => {
    //         console.error(err);
    //         alert('Failed to write event data to API');
    //       });
    // }


    render(){
        if (this.state.loading){
            return(
            <LoaderComponent
                title={"Please wait as transaction is being mined from chain...."}
                >
            </LoaderComponent>)
        } else{
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <HeadBannerComponent
                        bannerHead={"Store Front Creation"}
                        bannerWords={"Add Store Fronts to your Tumbula Store"}
                        // headButton={"Add New Store"}
                        >
                    </HeadBannerComponent>
                    <FormOuterComponent
                        formTitle={"Store Front Creation Form"}
                    
                    >
                        <form className="form-sample" onSubmit={this.handleStoreCreation}>
                            <div className="row">
                                <FormMinorComponent
                                    label={"Store Front Name"}
                                    placeHolder={"Please Store Front Name"}
                                    name={"storeName"}
                                    value={this.state.storeName}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
                                <FormMinorComponent
                                    label={"Store Location"}
                                    placeHolder={"Please Enter store front location"}
                                    name={"storeLocation"}
                                    value={this.state.storeLocation}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
                                <FormMinorComponent
                                    label={"Store Merchandise"}
                                    placeHolder={"Please store front merchandise"}
                                    name={"storeMerchandise"}
                                    value={this.state.storeMerchandise}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
                            </div>
                            <div className="row">
                                <ReusableButtonComponent
                                    type={"submit"}
                                    className={"btn btn-outline-secondary btn-lg"}
                                    label={"Submit"}
                                    
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
    }
}

export default withRouter(StoreFrontCreatorBody);