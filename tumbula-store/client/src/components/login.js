import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//image imports
import logo from './static/images/logo.svg';

export default class LoginComponent extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
      }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/api/v1/auth/login/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log(res.data)
            if (res.status === 200) {
              this.props.history.push('/admin');
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
          });
    }

    render(){
        return(
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                        <div className="row flex-grow">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="auth-form-transparent text-left p-3">
                        <div className="brand-logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <h4>Welcome back to Tumbula Stores</h4>
                        <h6 className="font-weight-light">Happy to see you again!</h6>

                        <form className="pt-3" onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="exampleInputEmail">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend bg-transparent">
                                <span className="input-group-text bg-transparent border-right-0">
                                    <i className="mdi mdi-account-outline text-primary"></i>
                                </span>
                                </div>
                                <input type="text" className="form-control form-control-lg border-left-0" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required/>
                            </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleInputPassword">Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend bg-transparent">
                                <span className="input-group-text bg-transparent border-right-0">
                                    <i className="mdi mdi-lock-outline text-primary"></i>
                                </span>
                                </div>
                                <input type="password" className="form-control form-control-lg border-left-0" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>                        
                            </div>
                            </div>
                            <div className="my-2 d-flex justify-content-between align-items-center">
                            <div className="form-check">
                                <label className="form-check-label text-muted">
                                <input type="checkbox" className="form-check-input"/>
                                Keep me signed in
                                </label>
                            </div>
                            <a href="#" className="auth-link text-black">Forgot password?</a>
                            </div>
                            <div className="my-3">
                                <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"  value="Submit">LOGIN</button>
                            </div>
                            <div className="my-3">
                                <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"  value="Submit">LOGIN WITH METAMASK</button>
                            </div>
                            {/* <div className="mb-2 d-flex">
                            <button type="button" className="btn btn-facebook auth-form-btn flex-grow mr-1">
                                <i className="mdi mdi-facebook mr-2"></i>Facebook
                            </button>
                            <button type="button" className="btn btn-google auth-form-btn flex-grow ml-1">
                                <i className="mdi mdi-google mr-2"></i>Google
                            </button>
                            </div> */}
                            <div className="text-center mt-4 font-weight-light">
                            Store Owner and Don't have an account? <a href="register-2.html" className="text-primary">Request</a> one now
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="col-lg-6 login-half-bg d-flex flex-row">
                        <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2019 Kapson Labs Uganda.  All rights reserved.</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}