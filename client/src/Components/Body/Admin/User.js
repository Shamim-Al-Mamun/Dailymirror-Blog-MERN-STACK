import { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FaUser, FaCamera } from "react-icons/fa";

import UserContext from "../../../Context/UserContext";

function User() {
  const { user, setUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(true);
  const [changeUsername, setChangeUsername] = useState(false);
  const [changeUserPic, setChangeUserPic] = useState(false);

  const [newUserName, setNewUserName] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [file, setFile] = useState("");

  const [message, setMessage] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const handleUserName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var token = localStorage.getItem("token");
    if (token) {
      if (newUserName) {
        axios
          .put(
            `${baseURL}/user/update`,

            { ...user, username: newUserName },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log(res.data);
            setUser(res.data.user[0]);
            setNewUserName("");
            setMessage("Username has changed successfully!");
            setChangeUsername(false);
            setCurrentUser(true);
          })
          .catch((err) => console.log(err));
      } else {
        setMessage("Please fill up the fields!");
      }
    }
  };

  const handleUserImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let fd = new FormData();
    fd.append("pictures", file);
    var token = localStorage.getItem("token");
    if (token) {
      if (newUserImage) {
        axios
          .put(
            `${baseURL}/user/update`,

            { ...user, userImage: newUserImage },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log(res.data);
            setUser(res.data.user[0]);
            setNewUserName("");
            setMessage("User picture has changed successfully!");
            setChangeUsername(false);
            setChangeUserPic(false);
            setCurrentUser(true);
          })
          .catch((err) => console.log(err));
      } else {
        setMessage("Please upload a valid pic!");
      }
    }
    if (file) {
      axios
        .post(
          `${baseURL}/user/update`,

          fd,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          setUser(res.data.user[0]);
          setFile("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="user">
      <Container>
        <Card className="p-3 bg-light w-50 m-auto cardMaxMinWidth">
          {message && (
            <p
              className={
                message.length > 30 ? "small text-success" : "small text-danger"
              }
            >
              {message}
            </p>
          )}
          {currentUser && (
            <>
              <div className="d-flex align-items-center mb-3">
                <span className="me-1">
                  <FaUser />
                </span>
                <div className="w-75 m-0 small">
                  {user && (
                    <span>
                      {" "}
                      {user.username.charAt(0).toUpperCase() +
                        user.username.toString().slice(1)}
                    </span>
                  )}
                </div>
                <div className="w-25 ">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setChangeUsername(true);
                      setCurrentUser(false);
                      setChangeUserPic(false);
                      setNewUserImage("");
                      setMessage("");
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="w-75 m-0 small">
                  {user && (
                    <img
                      src={`/uploads/${user.userImage}`}
                      alt="user pic"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                </div>
                <div className="w-25 ">
                  <span className="small">
                    <FaCamera />
                  </span>{" "}
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setChangeUserPic(true);
                      setChangeUsername(false);
                      setCurrentUser(false);
                      setMessage("");
                      setNewUserImage("");
                      setFile("");
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </>
          )}
          {changeUsername && (
            <div>
              <form onSubmit={handleUserName}>
                <input
                  placeholder="User name"
                  autoFocus
                  maxLength={10}
                  value={newUserName}
                  className="w-50"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
                <Button type="submit" className="primary-btn mx-2 w-25 p-2">
                  Submit
                </Button>
              </form>
              <div className="ms-2 mt-2">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentUser(true);
                    setChangeUsername(false);
                    setChangeUserPic(false);
                    setMessage("");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}
          {changeUserPic && (
            <div>
              <form onSubmit={handleUserImage}>
                <div>
                  <input
                    placeholder="User name"
                    type="file"
                    className="w-50 border-0"
                    disabled={newUserImage}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setNewUserImage(e.target.files[0].name);
                    }}
                  />
                  <Button type="submit" className="primary-btn mx-2 w-25 p-2">
                    Submit
                  </Button>
                </div>
                <div>
                  <p className="m-0 ms-3 small text-muted">
                    <span className="small">
                      <span className="small">
                        {" "}
                        <span className="small">
                          JPG or PNG only. 100kb size max
                        </span>
                      </span>
                    </span>
                  </p>
                </div>
              </form>
              <div className="ms-3 mt-2">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentUser(true);
                    setChangeUsername(false);
                    setChangeUserPic(false);
                    setMessage("");
                  }}
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

export default User;
