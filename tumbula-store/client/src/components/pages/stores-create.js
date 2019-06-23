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

class StoresCreatorBody extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          storeInstance: undefined,
          account: null,
          web3: null,
          address: '',
          firstName: '',
          lastName: '',
          email: '',
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
            case "address":
                this.setState({"address": event.target.value})
            break;
            case "firstName":
                this.setState({"firstName": event.target.value})
                break;
            case "lastName":
                this.setState({"lastName": event.target.value})
                break;
            case "email":
                this.setState({"email": event.target.value})
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
                let result = await this.state.storeInstance.methods.addStoreOwner(this.state.address,this.state.firstName,this.state.lastName, this.state.email).send({ from: this.state.account})
                this.setLastTransactionDetails(result)

                //Rudimentary create data envelope from event
                let dataEnvelope = {
                    username: result.events.storeOwnerCreated.returnValues.firstname,
                    first_name: result.events.storeOwnerCreated.returnValues.firstname,
                    last_name: result.events.storeOwnerCreated.returnValues.lastname,
                    email: result.events.storeOwnerCreated.returnValues.email,
                    password: result.events.storeOwnerCreated.returnValues.password,
                    public_address: result.events.storeOwnerCreated.returnValues.storeowneraddress,
                    role: 'STORE_OWNER'
                }

                this.saveResultToApi(dataEnvelope)
                this.loading = false;
                console.log(result.events.storeOwnerCreated.returnValues.firstname)
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

    saveResultToApi(eventData){
        let formData  = new FormData();

        for(let name in eventData) {
            formData.append(name, eventData[name]);
          }

        fetch('http://localhost:8000/api/v1/auth/register/', {
            method: 'POST',
            body: formData
          })
          .then(res => {
            if (res.status === 201) {
              this.props.history.push('/stores');
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Failed to write event data to API');
          });
    }


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
                                    label={"Address"}
                                    placeHolder={"Please Enter Address of store owner"}
                                    name={"address"}
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                >
                                </FormMinorComponent>
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
                                <FormMinorComponent
                                    label={"Email"}
                                    placeHolder={"Please Enter Email Address"}
                                    name={"email"}
                                    value={this.state.email}
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

export default withRouter(StoresCreatorBody);