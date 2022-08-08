import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Arrow90degLeft } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

import UserContext from "../../../Context/UserContext";

function Editpost() {
  const { posts, setPosts } = useContext(UserContext);

  const { postID } = useParams();
  var navigate = useNavigate();

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const post = posts.filter((post) => post._id === postID);
  if (post && post.length && post.length > 0) {
    var { title, catagory, description } = post[0];
  }
  const [updatedPost, setUpdatedPost] = useState({
    title,
    catagory,
    description,
    postImage: "",
  });
  const [file, setFile] = useState("");
  const handleUpdatePost = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let fd = new FormData();
    fd.append("pictures", file);

    axios
      .put(`${baseURL}/posts/${postID}`, updatedPost)
      .then((res) => {
        const data = res.data.posts;
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${baseURL}/posts`, fd)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/dashboard");
    setUpdatedPost({
      catagory: "",
      title: "",
      description: "",
    });
  };
  return (
    <Container className="editpost">
      <div className="w-25 ms-auto text-end">
        <Link to="/dashboard" className="small primary-text-color d-flex">
          <div className="me-1 small user-select-none">Dashboard</div>
          <div className="me-1 small">
            <Arrow90degLeft />
          </div>
        </Link>
      </div>
      {post &&
        post.length &&
        post.length > 0 &&
        post.map((post) => {
          return (
            <Card className="p-4 mt-3 w-100 bg-light" key={post._id}>
              <form onSubmit={handleUpdatePost} encType="multipart/form-data">
                <div className="d-flex align-items-center mb-2">
                  <div className="w-25 text-center">
                    <label className="managetitle">Title:</label>
                  </div>
                  <div className="w-75 ">
                    <input
                      autoFocus
                      required
                      maxLength={100}
                      className="w-100 addPostINPUT"
                      value={updatedPost.title}
                      onChange={(e) => {
                        setUpdatedPost({
                          ...updatedPost,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="w-25 text-center">
                    <label className="managetitle">Catagory:</label>
                  </div>
                  <div className="w-75 ">
                    <Dropdown>
                      <Dropdown.Toggle
                        className="catDropdown"
                        id="dropdown-basic"
                      >
                        {updatedPost.catagory}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Lifestyle",
                            });
                          }}
                        >
                          Lifestyle
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Wild",
                            });
                          }}
                        >
                          Wild
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Film",
                            });
                          }}
                        >
                          Film
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Space",
                            });
                          }}
                        >
                          Space
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Food",
                            });
                          }}
                        >
                          Food
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Beach",
                            });
                          }}
                        >
                          Beach
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({ ...updatedPost, catagory: "Gym" });
                          }}
                        >
                          Gym
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Music",
                            });
                          }}
                        >
                          Music
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Mountain",
                            });
                          }}
                        >
                          Mountain
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({ ...updatedPost, catagory: "Car" });
                          }}
                        >
                          Car
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="catDropdownItem"
                          onClick={() => {
                            setUpdatedPost({
                              ...updatedPost,
                              catagory: "Bike",
                            });
                          }}
                        >
                          Bike
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="w-25 text-center">
                    <label className="managetitle">Description:</label>
                  </div>
                  <div className="w-75 ">
                    <textarea
                      required
                      maxLength={5000}
                      className="w-100 editPostTEXTAREA"
                      value={updatedPost.description}
                      onChange={(e) => {
                        setUpdatedPost({
                          ...updatedPost,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="file"
                    name="postPic"
                    className="border-0 small"
                    disabled={updatedPost.postImage}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setUpdatedPost({
                        ...updatedPost,
                        postImage: e.target.files[0].name,
                      });
                    }}
                  />
                </div>
                <p className="m-0 text-center small text-muted">
                  <span className="small">
                    <span className="small">
                      <span className="small">
                        JPG or PNG only. resolution 1920 x 1200 recommended
                      </span>
                    </span>
                  </span>
                </p>
                <div className="text-center my-2">
                  <Button
                    type="submit"
                    variant="info"
                    className="dashboardButton w-50 text-right mx-2 my-2 text-white"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Card>
          );
        })}
    </Container>
  );
}

export default Editpost;
