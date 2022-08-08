import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";
import Timestamp from "../../../utils/Timestamp";

function LatestPost() {
  const { posts } = useContext(UserContext);
  if (posts && posts.length > 0) {
    const timestamp = new Date().getTime();
    var timestamp1MonthAgo = timestamp - 2500000000;
    var FilteredPost = posts.filter(
      (post) => post.timestamp >= timestamp1MonthAgo
    );
  }

  return (
    <div>
      <h6 className="mb-3 text-center">Latest Posts</h6>
      {FilteredPost &&
        FilteredPost.length > 0 &&
        FilteredPost.map((post, index) => {
          return (
            <Link
              to={`/${post._id}`}
              className="text-decoration-none text-black"
              key={index}
            >
              <div className="d-flex mb-2">
                <div className="d-flex w-100">
                  <div className="w-100 ">
                    <img
                      src={`/uploads/${post.postImage}`}
                      alt="latestpostpic1"
                      className="latestPic rounded-3"
                    />
                  </div>
                  <div className="text-start w-100">
                    <div className="latestPostDetails">
                      <p className="latestPostTitle mb-3">{post.title}</p>
                      <p className="latestPostDate">
                        <p className="m-0 primary-text-color">
                          {post.catagory}
                        </p>
                        <span>posted </span>
                        <span className="date">
                          {Timestamp(post.timestamp)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default LatestPost;
