import React, {Component} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './1.pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './1.pages/Navbar/Navbar';
import Auth from './1.pages/Auth/Auth';
import Cookie from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin} from './redux/1.actions'

let cookieObj = new Cookie()
class App extends Component {

  componentDidMount(){
    let cookieVar = cookieObj.get('userData')
    if(cookieVar){
      this.props.keepLogin(cookieVar)
    }
  }

  render(){
    return (
      <div>
        <NavbarComp/>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={Auth} path='/auth' exact />
        </Switch>
      </div>
    )
  }
}

export default connect(null, {keepLogin})(withRouter(App))
