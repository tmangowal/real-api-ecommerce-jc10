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
import {connect} from 'react-redux'

class NavbarComp extends Component {
    state = {
        navbarOpen : false
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href='/'>Popokpedia</NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({navbarOpen : !this.state.navbarOpen})} />
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.role}</NavLink>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink>Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>Register</NavLink>
                                    </NavItem>
                                </>
                            }
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Edit Profile
                                    </DropdownItem>
                                    <DropdownItem>
                                        Cart
                                    </DropdownItem>
                                    <DropdownItem>
                                        History
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user
    }
}

export default connect(mapStateToProps)(NavbarComp)