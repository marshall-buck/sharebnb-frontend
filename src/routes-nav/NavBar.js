import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, Badge
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import './NavBar.css';


/** NavBar Component, responsive toggle
 * NavBar display changes depending on user logged in or not
 *
 * Props:
 * - logout: fn()
 *
 *
 * State: -isOpen: boolean -  collapse navbar
 *
 * Context: {currentUser}
 *  App -> NavBar
 *
 */
function NavBar({ logout }) {

  //navbar collapse  logic
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { currentUser } = useContext(UserContext);
  console.debug("NavBar", "currentUser=", currentUser);

  function showLoggedIn() {
    return (
      <>
        <NavItem>
          <NavLink to="/properties">Properties for Rent</NavLink>
        </NavItem>&nbsp;&nbsp;&nbsp;

        <NavItem>
          <NavLink to="/properties/add">List a Property</NavLink>
        </NavItem>&nbsp;&nbsp;&nbsp;

        <NavItem>
          <NavLink to="/messages">Inbox</NavLink>
          <Badge style={{ marginLeft: '.25rem' }}
            color="danger"
            pill
          >
            5
          </Badge>
        </NavItem>&nbsp;&nbsp;&nbsp;

        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>&nbsp;&nbsp;&nbsp;

        <NavItem>
          <NavLink to="/logout" onClick={logout}>
            Logout {currentUser.username}
          </NavLink>
        </NavItem>
      </>
    );
  }

  function showLoggedOut() {
    return (
      <>
        <NavItem>
          <NavLink to="/login">Log In</NavLink>
        </NavItem>&nbsp;&nbsp;&nbsp;
        <NavItem>
          <NavLink to="/signup">Sign up</NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar className="NavBar shadow-sm" bg="light" expand="md" color="white">
        <NavbarBrand href="/">Share BnB</NavbarBrand>
        <NavbarToggler onClick={toggle} aria-controls="basic-navbar-nav" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto">
            {currentUser
              ?
              showLoggedIn()
              :
              showLoggedOut()
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
