import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPass() {
  const Navigate = useNavigate();
  const mail = JSON.parse(localStorage.getItem("resetMail"));

  const [newPass, setNewPass] = useState("");
  const [confirmnewPass, setConfirmNewPass] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const onsubmitPass = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newPass && !confirmnewPass) {
      setMessage("");
      setError("Please input all the fields!");
    } else if (newPass !== confirmnewPass) {
      setMessage("");
      setError("Confirm password incorrect!");
    } else if (newPass.length < 8) {
      setMessage("");
      setError("Password minimum 8 characters!");
    } else if (newPass === newPass.toLowerCase()) {
      setMessage("");
      setError("Password must contain one uppercase letter!");
    } else {
      axios
        .put(`${baseURL}/user/forgotpassword`, {
          email: mail,
          password: newPass,
        })
        .then((res) => {
          console.log(res.data);
          window.alert(
            "password updated successfully. please login to continue!"
          );
          Navigate("/login", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
      setMessage("Password has reset successfully!");
      setError("");
      setNewPass("");
      setConfirmNewPass("");
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
          <div className="message small mt-3">
            {error && <p className="text-center small text-danger">{error}</p>}
            {message && (
              <p className="text-center small text-success">{message}</p>
            )}
          </div>
          <form onSubmit={onsubmitPass}>
            <div className="text-center">
              <input
                className={
                  message.length === 30 && !newPass
                    ? "w-100 m-auto mb-3 invalidInput"
                    : "w-100 m-auto mb-3 "
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
                    ? "w-100 m-auto mb-3 invalidInput"
                    : "w-100 m-auto mb-3 "
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
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default ResetPass;
