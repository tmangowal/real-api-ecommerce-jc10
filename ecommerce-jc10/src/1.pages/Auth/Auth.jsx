import React, { Component } from 'react';
import './Auth.css'
// 1. Import action itu sendiri
import {onLogin, onLogout} from './../../redux/1.actions'
// 2. Import connect dari react-redux
import {connect} from 'react-redux'

class Auth extends Component {
    state = {
        page : 'REGISTER',
        registerUsername : '',
        registerPassword : '',
        repeatPassword : '',
        registerEmail : '',
        loginUsername : '',
        loginPassword: ''
    }

    onLoginBtnHandler = () => {
        // let loginObj = {
        //     username : this.state.loginUsername,
        //     password : this.state.loginPassword
        // }
        // this.props.onLogout()
        this.props.onLogin({asalNama : this.state.loginUsername, asalKunci : this.state.loginPassword})
    }

    render() {
        return (
            <div className="container auth">
                <div className="row">
                    <div className="col-3 text-center auth-left">
                        <h3>Welcome!</h3>
                        <p>Belanja anti ribet di Popokpedia, mari bergabung bersama kami!</p>
                        <br/>
                        <br/>
                        <div className="tab-auth">
                            <div className={"d-inline-block m-1 text-center " + (this.state.page == "LOGIN" ? "active" : '')} onClick={() => this.setState({page : 'LOGIN'})}>
                                Login
                            </div>
                            <div className={"d-inline-block m-1 text-center " + (this.state.page == "REGISTER" ? 'active' : '')} onClick={() => this.setState({page : "REGISTER"})}>
                                Register
                            </div>
                        </div>
                    </div>
                    <div className="col-9 auth-right text-center pb-5">
                        {
                            this.state.page == "REGISTER" 
                            ?
                            <div className="container-fluid">
                                <h3 className="pb-3" style={{color : '#495057', marginTop:'8%'}}>Register Now!</h3>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Email"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Repeat Password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <input type="button" className="btn float-right btn-register" value="Register"/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="container-fluid">
                                <h3 className="pb-3" style={{color : '#495057', marginTop:'8%'}}>Login Now!</h3>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Username" onChange={(e) => this.setState({loginUsername : e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.setState({loginPassword : e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <input type="button" className="btn float-right btn-register" value="Login" onClick={this.onLoginBtnHandler}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// 3. connect (<MAPSTATETOPROPS>, {<ACTION>})(<COMPONENT>)
export default connect(null, {onLogin, onLogout})(Auth);