import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Pinterest } from "react-bootstrap-icons";

import UserContext from "../../../Context/UserContext";

function Profile() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="profile">
        {profile &&
          profile.length > 0 &&
          profile.map((profile, index) => {
            return (
              <div className="position-relative" key={index}>
                <div className="w-100 text-center position-absolute">
                  <img
                    className="propic"
                    src={`/uploads/${profile.profileImage}`}
                    alt="propic"
                  />
                </div>
                <div className="profile rounded-3 mt-5 px-4 w-100 text-center position-absolute">
                  <div className="pt-5">
                    <h6 className="text-center mt-5">{profile.name}</h6>
                    <p className="px-2 profileBio">{profile.bio}</p>
                    <div className="d-flex justify-content-around w-75 m-auto">
                      <a
                        href={`https://${profile.links[0].fb}/`}
                        rel="noreferrer"
                        target="_blank"
                        className="text-info profileLinks hover"
                      >
                        <Facebook />
                      </a>
                      <a
                        href={`https://${profile.links[1].insta}/`}
                        rel="noreferrer"
                        target="_blank"
                        className="text-info profileLinks hover"
                      >
                        <Instagram />
                      </a>
                      <a
                        href={`https://${profile.links[2].twitter}/`}
                        rel="noreferrer"
                        target="_blank"
                        className="text-info profileLinks"
                      >
                        <Twitter />
                      </a>{" "}
                      <a
                        href={`https://${profile.links[3].pint}/`}
                        rel="noreferrer"
                        target="_blank"
                        className="text-info profileLinks"
                      >
                        <Pinterest />
                      </a>
                    </div>
                    <div className="my-4 small">
                      <Link to="/about">
                        <a href="/" className="link-btn">
                          READ MORE
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Profile;
