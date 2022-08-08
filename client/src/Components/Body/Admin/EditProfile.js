import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Arrow90degLeft } from "react-bootstrap-icons";
import axios from "axios";

import UserContext from "../../../Context/UserContext";

function EditProfile() {
  const { profile, setProfile } = useContext(UserContext);
  var navigate = useNavigate();
  const { profileID } = useParams();
  if (profile && profile.length && profile.length > 0) {
    var { name, title, bio } = profile[0];
  }
  const [updatedProfile, setUpdatedProfile] = useState({
    name,
    title,
    bio,
  });
  const [profileImage, setProfileImage] = useState("");
  const [displayImage, setDisplayImage] = useState("");

  const [message, setMessage] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const handleUpdatedProfle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let fd1 = new FormData();
    let fd2 = new FormData();
    fd1.append("pictures", profileImage);
    fd2.append("pictures", displayImage);

    if (updatedProfile.name && updatedProfile.name && updatedProfile.bio) {
      axios
        .put(`${baseURL}/profile/${profileID}`, updatedProfile)
        .then((res) => {
          console.log(res.data);
          const data = res.data.profiles;
          setProfile(data);
        })
        .catch((err) => console.log(err));
      setMessage("");
      setUpdatedProfile({
        name: "",
        title: "",
        bio: "",
        profileImage: "",
        displayImage: "",
      });
      navigate("/dashboard");
    } else {
      setMessage("Please fill up all the fields!");
    }
    if (profileImage) {
      axios
        .put(`${baseURL}/profile/${profileID}`, fd1)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      navigate("/dashboard");
    }
    if (displayImage) {
      axios
        .put(`${baseURL}/profile/${profileID}`, fd2)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      navigate("/dashboard");
    }
  };
  return (
    <div className="editProfile">
      {profile &&
        profile.length > 0 &&
        profile.map((profile) => {
          return (
            <>
              <Container>
                <div className="w-25 ms-auto text-end">
                  <Link
                    to="/dashboard"
                    className="small primary-text-color d-flex"
                  >
                    <div className="me-1 small user-select-none">Dashboard</div>
                    <div className="me-1 small">
                      <Arrow90degLeft />
                    </div>
                  </Link>
                </div>
                <Card className="p-4 mt-3 bg-light">
                  {message && (
                    <p
                      className={
                        message.length > 25
                          ? "small text-danger text-center"
                          : "small text-success text-center"
                      }
                    >
                      {message}
                    </p>
                  )}
                  <form onSubmit={handleUpdatedProfle}>
                    <div className="d-flex align-items-center mb-2">
                      <div className="w-25 text-center">
                        <label className="managetitle">Name:</label>
                      </div>
                      <div className="w-75 ">
                        <input
                          autoFocus
                          maxLength={20}
                          name="title"
                          placeholder="title"
                          className="w-100 addPostINPUT"
                          value={updatedProfile.name}
                          onChange={(e) =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="w-25 text-center">
                        <label className="managetitle">Title:</label>
                      </div>
                      <div className="w-75 ">
                        <input
                          name="title"
                          placeholder="title"
                          maxLength={30}
                          className="w-100 addPostINPUT"
                          value={updatedProfile.title}
                          onChange={(e) =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="w-25 text-center">
                        <label className="managetitle">Bio:</label>
                      </div>
                      <div className="w-75 ">
                        <textarea
                          name="description"
                          placeholder="description"
                          className="w-100 addPostTEXTAREA"
                          maxLength={300}
                          value={updatedProfile.bio}
                          onChange={(e) =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              bio: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <div>
                        <label className="managetitle my-2">
                          Profile pictute:
                        </label>
                      </div>
                      <div>
                        <input
                          type="file"
                          name="profilePic"
                          className="border-0"
                          disabled={updatedProfile.profileImage}
                          onChange={(e) => {
                            setProfileImage(e.target.files[0]);
                            setUpdatedProfile({
                              ...updatedProfile,
                              profileImage: e.target.files[0].name,
                            });
                          }}
                        />
                      </div>
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
                      <div>
                        <label className="managetitle my-2">
                          Display pictute:
                        </label>
                      </div>
                      <div>
                        <input
                          type="file"
                          name="displayPic"
                          className="border-0"
                          disabled={updatedProfile.displayImage}
                          onChange={(e) => {
                            setDisplayImage(e.target.files[0]);
                            setUpdatedProfile({
                              ...updatedProfile,
                              displayImage: e.target.files[0].name,
                            });
                          }}
                        />
                      </div>
                      <p className="m-0 ms-3 small text-muted w-100">
                        <span className="small">
                          <span className="small">
                            {" "}
                            <span className="small">
                              JPG or PNG only. resolution 3024 x 4032
                              recommended
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="w-100 text-center my-2">
                      <Button
                        className="dashboardButton w-50"
                        type="submit"
                        variant="success"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </Card>
              </Container>
            </>
          );
        })}
    </div>
  );
}

export default EditProfile;
