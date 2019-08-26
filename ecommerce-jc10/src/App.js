import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './1.pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './1.pages/Navbar/Navbar';
import Auth from './1.pages/Auth/Auth';



function App() {
  return (
    <div>
      <NavbarComp/>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Auth} path='/auth' exact />
      </Switch>
    </div>
  );
}

export default withRouter(App)
