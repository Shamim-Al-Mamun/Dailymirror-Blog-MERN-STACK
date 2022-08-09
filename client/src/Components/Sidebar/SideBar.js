import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaEye,
  FaLock,
  FaUser,
  FaUserEdit,
  FaAngleRight,
} from "react-icons/fa";
import { MdMessage, MdMail, MdSecurity } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import axios from "axios";

import UserContext from "../../Context/UserContext";

const SideBar = ({ children }) => {
  const Navigate = useNavigate();

  const { user, setLoading, setAuth } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  var routes = [];
  if (user) {
    const { role } = user;
    if (role === "Admin") {
      routes = [
        {
          path: "/",
          name: "View",
          icon: <FaEye />,
        },
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: <FaHome />,
        },
        {
          path: "/subscription",
          name: "Subscribtions",
          icon: <MdMail />,
        },
        {
          path: "/messages",
          name: "Messages",
          icon: <MdMessage />,
        },
        {
          path: "/analytics",
          name: "Analytics",
          icon: <BiAnalyse />,
        },
        {
          path: "/popular",
          name: "Popular posts",
          icon: <AiFillHeart />,
        },
        {
          path: "/",
          name: "Settings",
          icon: <BiCog />,
          exact: true,
          subRoutes: [
            {
              path: "/settings/user",
              name: "User",
              icon: <FaUser />,
            },
            {
              path: "settings/manage/users",
              name: "Manage Users",
              icon: <FaUserEdit />,
            },
            {
              path: "settings/security",
              name: "Password and Security",
              icon: <MdSecurity />,
            },
          ],
        },
      ];
    } else {
      routes = [
        {
          path: "/",
          name: "View",
          icon: <FaEye />,
        },
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: <FaHome />,
        },
        {
          path: "/subscription",
          name: "Subscribtions",
          icon: <MdMail />,
        },
        {
          path: "/messages",
          name: "Messages",
          icon: <MdMessage />,
        },
        {
          path: "/analytics",
          name: "Analytics",
          icon: <BiAnalyse />,
        },
        {
          path: "/popular",
          name: "Popular posts",
          icon: <AiFillHeart />,
        },
        {
          path: "/",
          name: "Settings",
          icon: <BiCog />,
          exact: true,
          subRoutes: [
            {
              path: "/settings/user",
              name: "User",
              icon: <FaUser />,
            },
            {
              path: "settings/security",
              name: "Password and Security",
              icon: <MdSecurity />,
            },
          ],
        },
      ];
    }
  } else {
    routes = [
      {
        path: "/",
        name: "View",
        icon: <FaEye />,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
      },
      {
        path: "/subscription",
        name: "Subscribtions",
        icon: <MdMail />,
      },
      {
        path: "/messages",
        name: "Messages",
        icon: <MdMessage />,
      },
      {
        path: "/analytics",
        name: "Analytics",
        icon: <BiAnalyse />,
      },
      {
        path: "/popular",
        name: "Popular posts",
        icon: <AiFillHeart />,
      },
      {
        path: "/",
        name: "Settings",
        icon: <BiCog />,
        exact: true,
        subRoutes: [
          {
            path: "/settings/user",
            name: "User",
            icon: <FaUser />,
          },
          {
            path: "settings/manage/users",
            name: "Manage Users",
            icon: <FaUserEdit />,
          },
          {
            path: "settings/security",
            name: "Password and Security",
            icon: <MdSecurity />,
          },
        ],
      },
    ];
  }

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  async function handleLogOut() {
    setLoading(true);
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseURL}/user/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAuth(false);
          setLoading(false);
          Navigate("/");
        })
        .catch((err) => console.log(err));
    }
    localStorage.removeItem("token");
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            backgroundColor: isOpen ? "#80808080" : "#8080801a",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={isOpen ? `sidebar` : `sidebar`}
        >
          <div className="top_section">
            <AnimatePresence>
              <div className="d-flex align-items-end">
                {user && user.userImage && (
                  <motion.img
                    animate={{
                      height: isOpen ? "50px" : "20px",
                      width: isOpen ? "50px" : "20px",
                      borderRadius: isOpen ? "50px" : "20px",
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    src={`/uploads/${user.userImage}`}
                    alt=" "
                    className="sidebarImg"
                  />
                )}
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="small"
                  >
                    {user && (
                      <span>
                        {" "}
                        {user.username.charAt(0).toUpperCase() +
                          user.username.toString().slice(1)}
                      </span>
                    )}
                  </motion.h1>
                )}
              </div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                animate={{
                  x: isOpen ? "0px" : "0px",
                  rotate: isOpen ? 180 : 0,

                  transition: {
                    duration: 0.5,
                  },
                }}
                className="bars"
              >
                <span className="pointer">
                  <FaAngleRight onClick={toggle} />
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <>
                  <NavLink to={route.path} key={index} className="link">
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </>
              );
            })}
            <div className="link" onClick={handleLogOut}>
              <div className="icon">
                <FaLock />
              </div>
              <AnimatePresence>
                <motion.div>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Logout
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </motion.div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default SideBar;
