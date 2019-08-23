import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './1.components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './1.components/Navbar/Navbar';


function App() {
  return (
    <div>
      <NavbarComp/>
      <Switch>
        <Route component={Home} path='/' exact />
      </Switch>
    </div>
  );
}

export default withRouter(App)
