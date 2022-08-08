import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.png";
import Container from "react-bootstrap/Container";
import UserContext from "../../Context/UserContext";

function NavBar() {
  const { auth } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const [currentScroll, setCurrentScroll] = useState(window.scrollY);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const handleToggle = () => {
    if (currentWidth <= 990) {
      setToggle(!toggle);
    }
  };
  const handleWindowScroll = () => {
    setCurrentScroll(window.scrollY);
  };
  function handleWindowResize() {
    setCurrentWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", handleWindowResize);
  }, [currentWidth, currentScroll]);
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      // bg="light"
      expand="lg"
      className={
        currentScroll >= 66
          ? " py-2 w-100 navScrollColor"
          : currentWidth <= 990
          ? "py-2 w-100 navScrollColor"
          : "py-2 w-100"
      }
    >
      <Container>
        <Navbar.Brand href="/">
          <img className="logo" src={logo} alt="blogLogo" />
          <span className="logoText">DailyMirror</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 toggleBar"
        >
          <button
            type="button"
            className={toggle ? "nav-toggler activeToggle" : "nav-toggler"}
            onClick={handleToggle}
          >
            <span></span>
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link href="#" className="p-0">
              <NavLink
                to="/"
                className="nav-link navLinks"
                onClick={() => {
                  handleToggle();
                }}
              >
                Blog
              </NavLink>
            </Nav.Link>
            <Nav.Link href="#" className="p-0">
              <NavLink
                className="nav-link navLinks"
                to="/about"
                onClick={() => {
                  handleToggle();
                }}
              >
                About
              </NavLink>
            </Nav.Link>
            <Nav.Link href="#" className="p-0">
              <NavLink
                className="nav-link navLinks"
                to="/contact"
                onClick={() => {
                  handleToggle();
                }}
              >
                Contact
              </NavLink>
            </Nav.Link>
            <Nav.Link href="#" className="p-0">
              <NavLink
                className="nav-link navLinks"
                to="/theme"
                onClick={() => {
                  handleToggle();
                }}
              >
                Theme
              </NavLink>
            </Nav.Link>
            {!auth && (
              <Nav.Link href="#" className="p-0">
                <NavLink
                  className="nav-link navLinks"
                  to="/login"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <span className="p-1 px-3 navLogin">Login</span>
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
