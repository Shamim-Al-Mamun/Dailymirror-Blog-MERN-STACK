import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

import NavBar from "./Components/Header/NavBar";
import Blog from "./Components/Body/Blog/Blog";
import About from "./Components/Body/About/About";
import Contact from "./Components/Body/Contact/Contact";
import Login from "./Components/Body/Login/Login";
import Dashboard from "./Components/Body/Admin/Dashboard";
import Footer from "./Components/Footer/Footer";
import Addpost from "./Components/Body/Admin/Addpost";
import SinglePost from "./Components/Body/Blog/SinglePost";
import Editpost from "./Components/Body/Admin/Editpost";
import ScrollToTop from "./ScrollToTop";
import EditProfile from "./Components/Body/Admin/EditProfile";
import SignUp from "./Components/Body/SignUp/SignUp";
import CatagoryWisePost from "./Components/Body/Blog/CatagoryWisePost";
import Subscription from "./Components/Body/Admin/Subscription";
import Messages from "./Components/Body/Admin/Messages";
import PopularPost from "./Components/Body/Admin/PopularPost";
import SideBar from "./Components/Sidebar/SideBar";
import Analytics from "./Components/Body/Admin/Analytics";
import User from "./Components/Body/Admin/User";
import ChangeTheme from "./Components/Body/Theme/ChangeTheme";
import PassAndSecurity from "./Components/Body/Admin/PassAndSecurity";
import ChangeMail from "./Components/Body/Admin/ChangeMail";
import ChangePass from "./Components/Body/Admin/ChangePass";
import ForgotPass from "./Components/Body/Admin/ForgotPass";
import ResetPass from "./Components/Body/Admin/ResetPass";
import ManageUsers from "./Components/Body/Admin/ManageUsers";

import PrivateOutlet from "./Components/PrivateOutlet";

//Context
import UserContext from "./Context/UserContext";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);

  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  //Theme Color
  var colors = JSON.parse(localStorage.getItem("colors"));
  //Favourite post
  var favouritePosts = JSON.parse(localStorage.getItem("favourites"));

  const getAuth = async () => {
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseURL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data.user[0].token;
          if (user) {
            setAuth(true);
            setUser(res.data.user[0]);
          } else {
            setAuth(false);
            setUser([]);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const getUsers = async () => {
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseURL}/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const users = res.data.users;
          if (users) {
            setUsers(users);
          } else {
            setUsers([]);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const getPosts = async () => {
    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        const posts = res.data.Posts;
        setPosts(posts);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getProfile = async () => {
    axios
      .get(`${baseURL}/profile`)
      .then((res) => {
        setProfile(res.data.profile);
      })
      .catch((err) => console.log(err));
  };
  const getContacts = async () => {
    axios.get(`${baseURL}/contact`).then((res) => {
      setContacts(res.data.contacts);
    });
  };
  const getSubscriptions = async () => {
    axios.get(`${baseURL}/subscription`).then((res) => {
      setSubscriptions(res.data.subscriptions);
    });
  };
  const setColors = (color) => {
    var root = document.querySelector(":root");
    root.style.setProperty("--primary-color", color[0]);
    root.style.setProperty("--primary-color-light", color[1]);
    root.style.setProperty("--primary-color-deep", color[2]);
  };

  useEffect(() => {
    if (colors) {
      setColors(colors);
    }
    if (favouritePosts) {
      setFavourites(favouritePosts);
    }
    getAuth();
    getUsers();
    getPosts();
    getProfile();
    getContacts();
    getSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  console.log(auth);
  const value = {
    user,
    auth,
    users,
    posts,
    profile,
    contacts,
    subscriptions,
    favourites,
    setFavourites,
    setLoading,
    setProfile,
    setPosts,
    setUsers,
    setSubscriptions,
    setContacts,
    setUser,
    setAuth,
  };
  return (
    <>
      {loading ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="loader"
          >
            <div>
              {colors ? (
                <HashLoader color={colors[0]} size={100} />
              ) : (
                <HashLoader color="#9b4b64" size={100} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <Router>
            <ScrollToTop>
              <UserContext.Provider value={value}>
                <NavBar />
                {auth && <SideBar />}
                <Routes>
                  <Route path="/" exact element={<Blog />} />
                  <Route path="/:postID" exact element={<SinglePost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/catagory/:postCat"
                    element={<CatagoryWisePost />}
                  />
                  <Route path="/login" element={<Login setAuth={setAuth} />} />
                  <Route path="/theme" element={<ChangeTheme />} />
                  <Route path="/forgotpassword" element={<ForgotPass />} />
                  <Route
                    path="/resetpassword/:Random"
                    element={<ResetPass />}
                  />
                  <Route path="/*" element={<PrivateOutlet auth={auth} />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="popular" element={<PopularPost />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings/user" element={<User />} />
                    <Route
                      path="settings/manage/users"
                      element={<ManageUsers />}
                    />
                    <Route path="signup" element={<SignUp />} />
                    <Route
                      path="settings/security"
                      element={<PassAndSecurity />}
                    />
                    <Route
                      path="settings/security/changemail"
                      element={<ChangeMail />}
                    />
                    <Route
                      path="settings/security/changepassword"
                      element={<ChangePass />}
                    />
                    <Route path="addpost" element={<Addpost />} />
                    <Route path="editpost/:postID" element={<Editpost />} />
                    <Route
                      path="editprofile/:profileID"
                      element={<EditProfile />}
                    />
                  </Route>
                </Routes>
                <Footer />
              </UserContext.Provider>
            </ScrollToTop>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
