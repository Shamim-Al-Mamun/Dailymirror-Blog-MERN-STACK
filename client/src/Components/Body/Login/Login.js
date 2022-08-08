import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Login({ setAuth }) {
  const Navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const onchange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    if (loginInfo.email && loginInfo.password) {
    }
  };

  const onsubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (loginInfo.email && loginInfo.password) {
      axios
        .post(`${baseURL}/user/login`, loginInfo)
        .then((res) => {
          const data = res.data;
          var token = data.access_token;
          if (token) {
            localStorage.setItem("token", token);
            setAuth(true);
            Navigate("/", { replace: true });
            setError("");
            setLoading(false);
            setLoginInfo({});
          } else {
            setError(data.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Please fill up all the fields!");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: "3px" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="login text-center "
      >
        <Card className="loginCard customCard ">
          <h3>Login</h3>
          <div className="message small">
            {error && <p className="text-danger small">{error}</p>}
          </div>
          <form onSubmit={onsubmit}>
            <div className="mb-2">
              <input
                autoFocus
                className={
                  error
                    ? loginInfo.email
                      ? "w-100"
                      : "w-100 form-control is-invalid"
                    : "w-100"
                }
                type="email"
                placeholder="Email"
                name="email"
                value={loginInfo.email}
                onChange={onchange}
              />
            </div>
            <div>
              <input
                className={
                  error
                    ? loginInfo.password
                      ? "w-100"
                      : "w-100 form-control is-invalid"
                    : "w-100"
                }
                type="password"
                placeholder="Password"
                name="password"
                value={loginInfo.password}
                onChange={onchange}
              />
            </div>
            <div className="text-center small m-0">
              <Link to="/forgotpassword" className="small primary-text-color">
                <span className="small link-btn">Forgot password?</span>
              </Link>
            </div>
            <Button className="primary-btn w-50 mt-3" type="submit">
              {loading && <span className="spinner-border spinner"></span>}{" "}
              Login
            </Button>
          </form>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default Login;
