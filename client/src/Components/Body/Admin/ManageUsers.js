import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function ManageUsers() {
  const { users, setUsers } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const deleteUser = (user) => {
    setLoading(true);
    setId(user._id);
    console.log(user.role);
    if (user.role !== "Admin") {
      var token = localStorage.getItem("token");
      if (token) {
        axios
          .delete(`${baseURL}/user/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data);
            const users = res.data.users;
            setUsers(users);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
      window.alert("Cannot delete the Admin");
    }
  };

  return (
    <div className="user">
      <Container>
        <Card className="p-2 mt-5 bg-light">
          <h6 className="text-center mb-3">Manage users</h6>
          <div className="d-flex text-center align-items-center mb-2 p-1 bg-secondary rounded">
            <p className="m-0 w-25 fw-bold managetitle">Username</p>
            <p className="m-0 w-25 fw-bold managetitle">Email</p>
            <p className="m-0 w-25 fw-bold managetitle">Role</p>
            <p className="m-0 w-25 fw-bold managetitle">Operations</p>
          </div>
          {users &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="d-flex align-items-center text-center small py-1"
                  >
                    <p className="small m-0 w-25 manageText text-start ms-3">
                      <FaUser />{" "}
                      {user.username.charAt(0).toUpperCase() +
                        user.username.toString().slice(1)}
                    </p>
                    <p className="small m-0 w-25 manageText">{user.email}</p>
                    <p className="small m-0 w-25 manageText">{user.role}</p>
                    <div className="w-25">
                      <Link className="w-25" to={`/`}>
                        <Button
                          variant="danger"
                          className="dashboardButton"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteUser(user);
                          }}
                        >
                          {loading && id === user._id && (
                            <span className="spinner-border spinner"></span>
                          )}{" "}
                          Delete
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          <div className="text-center my-2">
            <Link to="/signup">
              <Button
                variant="info"
                className="dashboardButton w-25 text-right mx-2 text-white"
              >
                Add user
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default ManageUsers;
