import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import { resetUser, getCartLength } from "./../../redux/1.actions";
import Axios from 'axios';
import { urlApi } from '../../3.helpers/database';


let cookieObj = new Cookie()
class NavbarComp extends Component {
    state = {
        navbarOpen : false
    }

    onBtnLogout = () => {
        cookieObj.remove('userData')
        this.props.resetUser()
    }

    componentDidMount () {
        Axios.get(urlApi + 'cart?userId=' + this.props.userObj.id)
        .then(res => {
            this.props.getCartLength(res.data.length)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to="/"><NavbarBrand>Popokpedia</NavbarBrand></Link>
                    <NavbarToggler onClick={() => this.setState({navbarOpen : !this.state.navbarOpen})} />
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    <NavItem>
                                        <NavLink>{this.props.cartLength}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.role}</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {
                                                this.props.userObj.role == 'admin'
                                                ?
                                                <Link style={{textDecoration:'none', color:'inherit'}} to="/admin/dashboard">
                                                    <DropdownItem>
                                                        Admin Dashboard
                                                    </DropdownItem>
                                                </Link>
                                                :
                                                null
                                            }
                                            <Link to="/cart" style={{textDecoration:'none', color:'inherit'}}>
                                                <DropdownItem>
                                                    Cart
                                                </DropdownItem>
                                            </Link>
                                            <Link to="/history" style={{textDecoration:'none', color:'inherit'}}>
                                                <DropdownItem>
                                                    History
                                                </DropdownItem>
                                            </Link>
                                            <Link to="/wishlist" style={{textDecoration:'none', color:'inherit'}}>
                                                <DropdownItem>
                                                    Wishlist
                                                </DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.onBtnLogout}>
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                                :
                                <>
                                    <NavItem style={{borderRight : '1px solid lightgrey'}}>
                                        <Link to="/auth"><NavLink>Login</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/auth"><NavLink>Register</NavLink></Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user,
        cartLength: state.cart.cartLength
    }
}

export default connect(mapStateToProps, {resetUser, getCartLength})(NavbarComp)