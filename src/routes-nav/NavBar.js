import React, { useState } from "react";
import { useContext } from "react";
import userContext from "../auth/UserContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
// import "./NavBar.css";


/** NavBar Component
 *
 * State: {boolean} collapse navbar
 *
 * Context: {user}
 *
 * NavBar display changes depending on user logged in or not
 */
function NavBar({ logout }) {
  //navbar collapse  logic
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { currentUser } = useContext(userContext);

  function showLoggedIn() {
    return (
      <>
        <NavItem>
          <NavLink to="/companies">Companies</NavLink>
        </NavItem>&nbsp;&nbsp;&nbsp;
        <NavItem>
          <NavLink to="/jobs">Jobs</NavLink>
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
      <Navbar className="NavBar" bg="light" expand="md" color="white">
        <NavbarBrand href="/">Share B&B</NavbarBrand>
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