import { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function ChangePass() {
  const Navigate = useNavigate();

  const { user, setAuth } = useContext(UserContext);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmnewPass, setConfirmNewPass] = useState("");

  const [message, setMessage] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  async function handleLogOut() {
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseURL}/user/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setAuth(false);
        })
        .catch((err) => console.log(err));
    }
    localStorage.removeItem("token");
  }
  const onsubmitPass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPass && newPass && confirmnewPass) {
      if (newPass === confirmnewPass) {
        if (newPass.length >= 8) {
          if (newPass !== newPass.toLowerCase()) {
            const token = localStorage.getItem("token");
            if (token) {
              axios
                .put(
                  `${baseURL}/user/resetpassword`,
                  {
                    ...user,
                    currentPassword: currentPass,
                    newPassword: newPass,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  window.alert(
                    "password updated successfully. please login to continue!"
                  );
                  handleLogOut();
                  Navigate("/login", { replace: true });
                })
                .catch((err) => {
                  console.log(err);
                });
              setMessage("Password has changed successfully!");
              setCurrentPass("");
              setNewPass("");
              setConfirmNewPass("");
            }
          } else {
            setMessage("Password must contain one uppercase letter!");
          }
        } else {
          setMessage("Password minimum 8 characters!");
        }
      } else {
        setMessage("Confirm password incorrect!");
      }
    } else {
      setMessage("Please fill up all the fields!");
    }
  };
  return (
    <div className="customContainer">
      <Container>
        <Card className="p-3 bg-light w-50 m-auto cardMaxMinWidth">
          {message && (
            <p
              className={
                message.length === 30 ||
                message.length === 27 ||
                message.length === 43 ||
                message.length === 13
                  ? "small text-danger text-center"
                  : "small text-success text-center"
              }
            >
              {message}
            </p>
          )}
          <form onSubmit={onsubmitPass}>
            <div className="text-center">
              <input
                className={
                  message.length === 30 && !currentPass
                    ? "w-50 m-auto mb-3 invalidInput"
                    : "w-50 m-auto mb-3 "
                }
                placeholder="Current password"
                autoFocus
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
              />
            </div>
            <div className="text-center">
              <input
                className={
                  message.length === 30 && !newPass
                    ? "w-50 m-auto mb-3 invalidInput"
                    : "w-50 m-auto mb-3 "
                }
                placeholder="New password"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className="text-center">
              <input
                className={
                  message.length === 30 && !confirmnewPass
                    ? "w-50 m-auto mb-3 invalidInput"
                    : "w-50 m-auto mb-3 "
                }
                placeholder="Confirm password"
                type="password"
                value={confirmnewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
              />
            </div>
            <div className="text-center">
              <Button className="primary-btn w-25 m-auto" type="submit">
                Submit
              </Button>
            </div>
          </form>
          <div className="text-center mb-2">
            <Link to="/settings/security">
              <button className="edit-btn">Back</button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default ChangePass;
