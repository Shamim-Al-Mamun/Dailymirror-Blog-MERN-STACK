import { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Arrow90degLeft } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

import UserContext from "../../../Context/UserContext";

function Addpost() {
  const navigate = useNavigate();

  const { setPosts, user, setPendingPosts } = useContext(UserContext);

  const [newPost, setNewPost] = useState({
    catagory: "Sports",
    title: "",
    description: "",
    postImage: "",
    postedBy: user.username,
    timestamp: "",
    status: false,
  });
  const [file, setFile] = useState("");
  const [error, setError] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const handleNewPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const timestamp = new Date().getTime();
    let fd = new FormData();
    fd.append("pictures", file);
    if (file) {
      axios
        .post(`${baseURL}/posts`, {
          ...newPost,
          timestamp: timestamp,
        })
        .then((res) => {
          console.log(res.data);
          const posts = res.data.posts;
          console.log(posts);
          const Approvedpost = posts.filter((post) => post.status === true);
          const Pendingpost = posts.filter((post) => post.status === false);
          console.log(Approvedpost);
          console.log(Pendingpost);
          setPosts(Approvedpost);
          setPendingPosts(Pendingpost);
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
      setNewPost({
        catagory: "",
        title: "",
        description: "",
        postImage: "",
        timestamp: "",
      });
      setError("");
      navigate("/dashboard");
    } else {
      setError("Please upload a valid pic!");
    }
  };

  useEffect(() => {
    if (user) {
      const { role } = user;
      if (role) {
        if (role === "Admin") {
          setNewPost({ ...newPost, status: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="addpost">
      <div className="w-25 ms-auto text-end">
        <Link to="/dashboard" className="small primary-text-color d-flex">
          <div className="me-1 small user-select-none">Dashboard</div>
          <div className="me-1 small">
            <Arrow90degLeft />
          </div>
        </Link>
      </div>
      <Card className="p-4 mt-3 bg-light">
        <form onSubmit={handleNewPost} encType="multipart/form-data">
          <div className="message">
            {error && <p className="text-center text-danger small">{error}</p>}
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="w-25 text-center">
              <label className="managetitle">Title:</label>
            </div>
            <div className="w-75 ">
              <input
                autoFocus
                required
                maxLength={100}
                name="title"
                placeholder="title"
                className="w-100 addPostINPUT"
                value={newPost.title}
                onChange={(e) => {
                  setNewPost({ ...newPost, title: e.target.value });
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
                <Dropdown.Toggle className="catDropdown" id="dropdown-basic">
                  {newPost.catagory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Lifestyle" });
                    }}
                  >
                    Lifestyle
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Wild" });
                    }}
                  >
                    Wild
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Film" });
                    }}
                  >
                    Film
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Space" });
                    }}
                  >
                    Space
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Food" });
                    }}
                  >
                    Food
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Beach" });
                    }}
                  >
                    Beach
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Gym" });
                    }}
                  >
                    Gym
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Music" });
                    }}
                  >
                    Music
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Mountain" });
                    }}
                  >
                    Mountain
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Car" });
                    }}
                  >
                    Car
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="catDropdownItem"
                    onClick={() => {
                      setNewPost({ ...newPost, catagory: "Bike" });
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
                name="description"
                maxLength={5000}
                placeholder="description"
                className="w-100 addPostTEXTAREA"
                value={newPost.description}
                onChange={(e) => {
                  setNewPost({ ...newPost, description: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="text-center">
            <input
              type="file"
              name="postPic"
              className="border-0"
              disabled={newPost.postImage}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setNewPost({ ...newPost, postImage: e.target.files[0].name });
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
              Add post
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default Addpost;
