import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

import UserContext from "../../../Context/UserContext";

function SignUp() {
  const { setUsers } = useContext(UserContext);

  const Navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "General",
    password: "",
    confirmPassword: "",
  });
  const { username, email, role, password, confirmPassword } = newUser;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const onsubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (email && role && password && confirmPassword) {
      if (password === confirmPassword) {
        if (password.length >= 8) {
          if (password !== password.toLowerCase()) {
            var token = localStorage.getItem("token");
            if (token) {
              axios
                .post(`${baseURL}/user/signup`, newUser)
                .then((res) => {
                  console.log(newUser);
                  const users = res.data.users;
                  const message = res.data.message;
                  setUsers(users);
                  if (users) {
                    setLoading(false);
                    setError("");
                    setMessage(message);
                    setNewUser({
                      username: "",
                      email: "",
                      role: "Admin",
                      password: "",
                      confirmPassword: "",
                    });
                    Navigate("/settings/manage/users");
                  } else {
                    setError(message);
                    setMessage("");
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            setError("Password must contain one uppercase letter!");
            setMessage("");
            setLoading(false);
          }
        } else {
          setError("Password minimum 8 characters!");
          setMessage("");
          setLoading(false);
        }
      } else {
        setMessage("");
        setError("Confirm password incorrect!");
        setLoading(false);
      }
    } else {
      setMessage("");
      setError("Please input all the fields!");
      setLoading(false);
    }
  };
  return (
    <div className="user">
      <Container>
        <Card className="p-3 bg-light w-50 m-auto cardMaxMinWidth">
          <div className="message  small">
            {error && <p className="text-danger small text-center">{error}</p>}
            {message && (
              <p className="text-success small text-center">{message}</p>
            )}
          </div>
          <form onSubmit={onsubmit}>
            <div className="text-center">
              <input
                className="w-75 m-auto mb-3"
                placeholder="User Name"
                autoFocus
                type="text"
                value={username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
            <div className="text-center">
              <input
                className={
                  error
                    ? email
                      ? "w-75 m-auto mb-3"
                      : "w-75 m-auto mb-3 form-control is-invalid"
                    : "w-75 m-auto mb-3"
                }
                placeholder="Email *"
                type="email"
                value={email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="w-75 m-auto  mb-3">
              <Dropdown>
                <Dropdown.Toggle
                  className="catDropdown w-50"
                  id="dropdown-basic"
                >
                  {newUser.role}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewUser({ ...newUser, role: "Admin" });
                    }}
                  >
                    Admin
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewUser({ ...newUser, role: "Moderator" });
                    }}
                  >
                    Moderator
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewUser({ ...newUser, role: "General" });
                    }}
                  >
                    General
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="text-center">
              <input
                className={
                  error
                    ? password
                      ? "w-75 m-auto mb-3"
                      : "w-75 m-auto mb-3 form-control is-invalid"
                    : "w-75 m-auto mb-3"
                }
                placeholder="password *"
                type="password"
                value={password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div className="text-center">
              <input
                className={
                  error
                    ? confirmPassword
                      ? "w-75 m-auto mb-3"
                      : "w-75 m-auto mb-3 form-control is-invalid"
                    : "w-75 m-auto mb-3"
                }
                placeholder="Confirm password *"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="text-center">
              <Button className="primary-btn w-50 m-auto" type="submit">
                {loading && <span className="spinner-border spinner"></span>}{" "}
                Submit
              </Button>
            </div>
          </form>
          <div className="text-center my-3">
            <Link to="/settings/manage/users">
              <button className="edit-btn">back</button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default SignUp;
