import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";

import UserContext from "../../../Context/UserContext";

function Dashboard() {
  const { posts, setPosts, profile, contacts, subscriptions, user } =
    useContext(UserContext);

  const [userRole, setUserRole] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  useEffect(() => {
    if (user) {
      const { role } = user;
      if (role) {
        setUserRole(role);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeletePost = (id) => {
    axios
      .delete(`${baseURL}/posts/${id}`)
      .then((res) => {
        const data = res.data.posts;
        setPosts(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container className="dashboard">
      {(userRole === "Admin" || userRole === "Moderator") && (
        <Card className="p-2 mt-5 bg-light">
          <h6 className="mb-4">Manage profile</h6>
          <div className="d-flex text-center align-items-center mb-2 p-1 bg-secondary rounded">
            <p className="m-0 w-25 fw-bold managetitle">Name</p>
            <p className="m-0 w-25 fw-bold managetitle">Title</p>
            <p className="m-0 w-25 fw-bold managetitle">Bio</p>
            <p className="m-0 w-25 fw-bold managetitle">Operations</p>
          </div>
          {profile &&
            profile.length > 0 &&
            profile.map((profile, index) => {
              return (
                <div
                  key={index}
                  className="d-flex align-items-center text-center small py-1"
                >
                  <p className="small m-0 w-25 manageText ">{profile.name}</p>
                  <p className="small m-0 w-25 manageText">{profile.title}</p>
                  <p className="small m-0 w-25 manageText">
                    {profile.bio.slice(0, 50) + "...."}
                  </p>
                  <div className="w-25">
                    <Link className="w-25" to={`/editprofile/${profile._id}`}>
                      <Button variant="success" className="dashboardButton">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </Card>
      )}
      <Card className="p-2 mt-5 bg-light">
        <h6>Manage post</h6>
        <p className="text-end mx-3 small m-0">
          <span className="small">
            Total posts: {posts && posts.length > 0 && posts.length}
          </span>
        </p>
        <div className="d-flex text-center mb-2 ps-4 bg-secondary text-balck p-1 rounded">
          <p className="m-0 w-25 fw-bold managetitle">Title</p>
          <p className="m-0 w-25 fw-bold managetitle">Description</p>
          <p className="m-0 w-25 fw-bold managetitle">Catagory</p>
          <p className="m-0 w-25 fw-bold managetitle">Operations</p>
        </div>
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <ul key={index}>
                  <li>
                    <div
                      className="d-flex small text-center mb-1"
                      key={post._id}
                    >
                      <p className="m-0 small  w-25 manageText">{post.title}</p>
                      <p className="m-0 small w-25 text-center manageText">
                        {post.description.slice(0, 30) + "...."}
                      </p>
                      <p className=" m-0 small w-25 text-center manageText">
                        {post.catagory}
                      </p>
                      <div className="w-25 d-flex justify-content-around">
                        <div className="w-50">
                          <Link
                            className="w-50 m-auto"
                            to={`/editpost/${post._id}`}
                          >
                            <Button
                              variant="success"
                              className="dashboardButton dashboard-btn"
                            >
                              Edit
                            </Button>
                          </Link>
                        </div>
                        <div className="w-50">
                          {" "}
                          <Link
                            className="w-50 m-auto"
                            to={`/editpost/${post._id}`}
                          >
                            <Button
                              variant="danger"
                              className="dashboardButton dashboard-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeletePost(post._id);
                              }}
                            >
                              Delete
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <p className="m-0 small">
                      <span className="blockquote-footer">
                        <span className="small">posted by</span>{" "}
                        <span className="fst-italic small">
                          {post.postedBy.charAt(0).toUpperCase() +
                            post.postedBy.toString().slice(1)}
                        </span>
                        <p className="small ms-2 m-0">
                          <span className="small">
                            <span className="small">
                              {new Date(post.timestamp).toLocaleString("en-US")}
                            </span>
                          </span>
                        </p>
                      </span>
                    </p>
                  </li>
                </ul>
                {index !== posts.length - 1 && <div className="line"></div>}
              </div>
            );
          })}
        <div className="text-center my-2">
          <Link to="/addpost">
            <Button
              variant="info"
              className="dashboardButton w-25 text-right mx-2 text-white"
            >
              Add post
            </Button>
          </Link>
        </div>
      </Card>
      <Card className="p-2 mt-5">
        <h6 className="mb-4">All Messages</h6>
        <div className="text-end mx-3 small">
          <span className="small">
            Total Messages: {contacts && contacts.length > 0 && contacts.length}
          </span>
        </div>
        <div className="d-flex mb-2 bg-secondary text-balck p-1 rounded">
          <p className="m-0 w-25 ms-4 fw-bold managetitle">Name</p>
          <p className="m-0 w-25 fw-bold managetitle">Email</p>
          <p className="m-0 w-25 fw-bold managetitle">Subject</p>
          <p className="m-0 w-25 fw-bold managetitle">Message</p>
        </div>
        {contacts &&
          contacts.length > 0 &&
          contacts.map((contact, index) => {
            return (
              <div key={index}>
                <ul>
                  <li>
                    <div className="d-flex small">
                      <p className="small m-0 w-25 manageText">
                        {contact.name}
                      </p>
                      <p className="small m-0 w-25 manageText">
                        {contact.email}
                      </p>
                      <p className="small m-0 w-25 manageText">
                        {contact.subject}
                      </p>
                      <p className="small m-0 w-25 manageText">
                        {contact.message.slice(0, 30) + "...."}
                      </p>
                    </div>
                  </li>
                </ul>
                {index !== contacts.length - 1 && <div className="line"></div>}
              </div>
            );
          })}
        <div className="text-center my-2">
          <Link to="/messages">
            <Button
              variant="info"
              className="dashboardButton w-25 text-right mx-2 text-white"
            >
              See details
            </Button>
          </Link>
        </div>
      </Card>
      <Card className="p-2 mt-5 mb-5">
        <h6 className="mb-4">All Subscriptions</h6>
        <div className="text-end mx-3 small">
          <span className="small">
            Total Subscriptions:
            {subscriptions && subscriptions.length > 0 && subscriptions.length}
          </span>
        </div>
        <div className="d-flex mb-2 bg-secondary text-balck p-1 rounded">
          <p className="m-0 ms-3 w-25 fw-bold">Email</p>
        </div>
        {subscriptions &&
          subscriptions.length > 0 &&
          subscriptions.slice(0, 5).map((subscription, index) => {
            return (
              <div key={index}>
                <ul>
                  <li>
                    <div className="d-flex align-items-center small">
                      <p className="small m-0 w-75">{subscription.email}</p>
                    </div>
                  </li>
                </ul>
                {index !== subscriptions.length - 1 && (
                  <div className="line"></div>
                )}
              </div>
            );
          })}
        <div className="text-center my-2">
          <Link to="/subscription">
            <Button
              variant="info"
              className="dashboardButton w-25 text-right mx-2 text-white"
            >
              See details
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}

export default Dashboard;
