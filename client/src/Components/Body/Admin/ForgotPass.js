import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPass() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //API URL
  const baseURL = process.env.React_APP_API_URL;
  const URL = window.location.host;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  const Random = generateString(100);
  var templateParams = {
    email: mail,
    link: `${URL}/resetpassword/${Random.slice(1, Random.length)}`,
  };
  const onsubmitMail = (e) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    if (mail) {
      axios
        .put(`${baseURL}/user/forgotpassword`, {
          email: mail,
        })
        .then((res) => {
          const reset = res.data.reset;
          const message = res.data.message;
          if (reset) {
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
            setMessage("password reset link has been sent to this mail");
            setLoading(false);
            localStorage.setItem("resetMail", JSON.stringify(mail));
            setMail("");
            setError("");
          } else {
            setMessage("");
            setError(message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setError("Please input your email!");
      setMessage("");
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
        <Card className="forgotCard customCard ">
          {message.length < 45 ? (
            <>
              <h3 className="mb-3">Forgot password</h3>
              <div className="message small">
                {message && <p className="text-success small">{message}</p>}
                {error && <p className="text-danger small">{error}</p>}
              </div>
              <form onSubmit={onsubmitMail}>
                <div className="text-center">
                  <input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    autoFocus
                    value={mail}
                    className={
                      error
                        ? mail
                          ? "w-100"
                          : "w-100 form-control is-invalid"
                        : "w-100"
                    }
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
                <div className="text-center mt-3">
                  <Button type="submit" className="primary-btn w-50">
                    {loading && (
                      <span className="spinner-border spinner"></span>
                    )}{" "}
                    Submit
                  </Button>
                </div>
              </form>
              <div className="text-center mb-2">
                <Link to="/login">
                  <button className="edit-btn">Back</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="message small">
                {message && <p className="text-success small">{message}</p>}
              </div>
              <div className="text-center my-3">
                <Link to="/login">
                  <button className="edit-btn">Go to Login</button>
                </Link>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotPass;
