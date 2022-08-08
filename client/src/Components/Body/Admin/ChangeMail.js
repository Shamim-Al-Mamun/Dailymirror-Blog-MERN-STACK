import { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import emailjs from "emailjs-com";
import { useTimer } from "react-timer-hook";

import UserContext from "../../../Context/UserContext";

function ChangeMail() {
  const Navigate = useNavigate();
  const { user, setUser, setAuth } = useContext(UserContext);
  const [newMail, setNewMail] = useState("");

  const [verifyCode, setVerifyCode] = useState("");
  const [code, setCode] = useState("");

  const [verifyCodeInput, setVerifyCodeInput] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [timer, setTimer] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  var time = new Date();
  var times = time.setSeconds(time.getSeconds() + 150); // 2.5 minutes timer
  function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "10px" }}>
          <span>{minutes}m</span>:<span>{seconds}s</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setVerifyCode(randomNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  var templateParams = {
    email: newMail,
    random: verifyCode,
  };
  const onsubmitMail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTimer(times);
    console.log(verifyCode);
    if (newMail) {
      emailjs
        .send(
          "service_z56t325",
          "template_5r7bzxf",
          templateParams,
          "3Lz0qE7tu2R6ZvtgI"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
      setVerifyCodeInput(true);
      console.log(verifyCode);
      setMessage("A verification code has been sent to this mail");
      setError("");
    } else {
      setMessage("");
      setError("Please fill up all the fields!");
    }
  };
  const onsubmitCode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(verifyCode);
    console.log(code);
    console.log(timer);
    console.log(newMail);
    if (verifyCode.toString() === code.toString()) {
      var token = localStorage.getItem("token");
      if (token) {
        if (newMail) {
          axios
            .put(
              `${baseURL}/user/update`,
              { ...user, email: newMail },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              console.log(res.data);
              setUser(res.data.user[0]);
              window.alert(
                "email updated successfully. please login to continue!"
              );
              handleLogOut();
              Navigate("/login", { replace: true });
            })
            .catch((err) => console.log(err));
          setNewMail("");
          setMessage("Email has changed successfully");
          setError("");
          setVerifyCodeInput(false);
        } else {
          setError("Please fill up the fields!");
          setMessage("");
        }
      }
      console.log("email changed successfully");
      setVerifyCode("");
    } else {
      setError("invalid code!");
      setMessage("");
    }
  };
  const sendCodeAgain = () => {
    if (newMail) {
      emailjs
        .send(
          "service_z56t325",
          "template_5r7bzxf",
          templateParams,
          "3Lz0qE7tu2R6ZvtgI"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="customContainer">
      <Container>
        <Card className="p-3 bg-light w-50 m-auto cardMaxMinWidth">
          {message && (
            <p className="small text-success text-center">{message}</p>
          )}
          {error && <p className="small text-danger text-center">{error}</p>}
          {!verifyCodeInput && (
            <div>
              <form onSubmit={onsubmitMail}>
                <div className="text-center">
                  <input
                    placeholder="Enter your mail"
                    type="email"
                    name="email"
                    autoFocus
                    value={newMail}
                    className="w-50"
                    onChange={(e) => setNewMail(e.target.value)}
                  />
                </div>
                <div className="text-center mt-3">
                  <Button type="submit" className="primary-btn w-25">
                    Submit
                  </Button>
                </div>
              </form>
              <div className="text-center mb-2">
                <Link to="/settings/security">
                  <button className="edit-btn">Back</button>
                </Link>
              </div>
            </div>
          )}
          {verifyCodeInput && (
            <div>
              <div>
                <MyTimer expiryTimestamp={timer} />
              </div>
              <form onSubmit={onsubmitCode}>
                <div className="text-center">
                  <input
                    placeholder="Enter code"
                    autoFocus
                    className="w-50"
                    type="number"
                    maxLength={4}
                    onChange={(e) => {
                      e.preventDefault();
                      setCode(e.target.value);
                    }}
                  />
                </div>
                <div className="text-center">
                  <div
                    className="edit-btn pointer w-25 m-auto"
                    onClick={() => {
                      sendCodeAgain();
                    }}
                  >
                    Send code again
                  </div>
                </div>
                <div className="text-center mt-3">
                  <Button type="submit" className="primary-btn w-25">
                    Submit
                  </Button>
                </div>
              </form>
              <div className="text-center mb-2">
                <button
                  className="edit-btn"
                  onClick={() => setVerifyCodeInput(false)}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default ChangeMail;
