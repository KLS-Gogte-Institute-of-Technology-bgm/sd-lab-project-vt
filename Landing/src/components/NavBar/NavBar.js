import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar type="dark" expand="md" style={{backgroundColor: 'black'}}>
        <NavbarBrand href="/" style={{fontFamily: 'bungee'}}><span style={{color: 'red'}}>PI</span>GO Auto</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink active href="/buy">
                Buy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active>
                Sell
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink href="#" active>
                Contact Us
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}