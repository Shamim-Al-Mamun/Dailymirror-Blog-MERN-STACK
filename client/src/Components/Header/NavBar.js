import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeartFill } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.png";
import Container from "react-bootstrap/Container";
import { AnimatePresence, motion } from "framer-motion";

import UserContext from "../../Context/UserContext";

function NavBar() {
  const { auth, favourites, setFavourites } = useContext(UserContext);
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
    const favouritePosts = JSON.parse(localStorage.getItem("favourites"));
    if (favouritePosts) {
      setFavourites(favouritePosts);
    }
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", handleWindowResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {favourites && favourites.length > 0 && (
              <Nav.Link href="#" className="p-0">
                <NavLink
                  className="nav-link navLinks"
                  to="/favourites"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <AnimatePresence></AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0, scale: [0.5, 2] }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-danger"
                  >
                    <div className="d-flex justify-content-center">
                      <div>
                        <HeartFill />
                      </div>
                      <span className="favlen text-white">
                        {favourites.length}
                      </span>
                    </div>
                  </motion.span>
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
