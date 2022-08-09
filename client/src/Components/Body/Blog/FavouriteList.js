import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function FavouriteList() {
  const { posts, favourites } = useContext(UserContext);

  var favouritePosts = [];
  if (favourites && favourites.length > 0) {
    if (posts && posts.length > 0) {
      favourites.map((favouriteID) => {
        const favourite = posts.filter((post) => post._id === favouriteID);
        favouritePosts.push(favourite[0]);
        return favouritePosts;
      });
    }
  }

  return (
    <div className="FavouriteList mb-4">
      {favouritePosts && favouritePosts.length > 0 && (
        <h6 className="my-3 text-center">FavouriteList</h6>
      )}
      {favouritePosts &&
        favouritePosts.length > 0 &&
        favouritePosts.map((post) => {
          return (
            <Link to={`/${post._id}`} className="text-decoration-none">
              <div className="mb-3 p-2">
                <img
                  src={`/uploads/${post.postImage}`}
                  alt="latestpostpic1"
                  className="latestPic rounded-2"
                />
                <p className="small mb-1 text-center text-dark ">
                  <span className="small">
                    {post.title.slice(0, 100) + "..."}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default FavouriteList;
