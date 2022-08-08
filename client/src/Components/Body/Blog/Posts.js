import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Heart, HeartFill, ChatLeftDots } from "react-bootstrap-icons";

import UserContext from "../../../Context/UserContext";
import Timestamp from "../../../utils/Timestamp";

function Posts() {
  const { posts, setPosts, favourites, setFavourites } =
    useContext(UserContext);

  const [newcomment, setNewComment] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [commentPostID, setCommentPostID] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(10);

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const updatePosts = (id, post) => {
    axios
      .put(`${baseURL}/posts/${id}`, post)
      .then((res) => {
        const updateposts = res.data.posts;
        setPosts(updateposts);
      })
      .catch((err) => console.log(err));
  };
  const handleFavourite = (post) => {
    const { _id } = post;
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      const favouriteClicked = favourites.filter(
        (favourite) => favourite === _id
      );
      console.log(favouriteClicked);
      if (favouriteClicked && favouriteClicked.length > 0) {
        const updatedFavourites = favourites.filter(
          (favourite) => favourite !== _id
        );
        console.log(updatedFavourites);
        const updatedPost = {
          ...post,
          favouritesCount: post.favouritesCount - 1,
        };
        updatePosts(updatedPost._id, updatedPost);
        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      } else {
        const updatedFavourites = [...favourites, _id];
        console.log(updatedFavourites);
        const updatedPost = {
          ...post,
          favouritesCount: post.favouritesCount + 1,
        };
        updatePosts(updatedPost._id, updatedPost);
        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      }
    } else {
      const updatedFavourites = [_id];
      console.log(updatedFavourites);
      const updatedPost = {
        ...post,
        favouritesCount: post.favouritesCount + 1,
      };
      updatePosts(updatedPost._id, updatedPost);
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  };
  const handleNewComment = (post) => {
    const updatedPost = {
      ...post,
      comments: [...post.comments, newcomment],
      commentsCount: post.commentsCount + 1,
    };
    setNewComment("");
    updatePosts(updatedPost._id, updatedPost);
  };

  return (
    <div className="w-100 px-1">
      {posts &&
        posts.length > 0 &&
        posts.slice(0, showAllPosts).map((post, index) => {
          return (
            <div className="text-start mb-3" key={index}>
              <img
                src={`/uploads/${post.postImage}`}
                alt="post1pic"
                className="w-100 rounded-3 pointer"
              />
              <div className="d-flex justify-content-between user-select-none">
                <div className="d-flex mx-2">
                  <p className="catagory">{post.catagory}</p>
                  {post.timestamp && (
                    <p className="date ms-2">{Timestamp(post.timestamp)}</p>
                  )}
                </div>
                <div className="favNcom">
                  <span className="me-2">{post.favouritesCount}</span>
                  {favourites && favourites.length > 0 ? (
                    favourites.filter((favourite) => favourite === post._id)
                      .length > 0 ? (
                      <span
                        onClick={() => {
                          handleFavourite(post);
                        }}
                      >
                        <HeartFill className="heartFill pointer" />
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          handleFavourite(post);
                        }}
                      >
                        <Heart className="pointer hover" />
                      </span>
                    )
                  ) : (
                    <span
                      onClick={() => {
                        handleFavourite(post);
                      }}
                    >
                      <Heart className="pointer hover" />
                    </span>
                  )}
                  <span className="mx-2">
                    {post.comments && post.comments.length > 0
                      ? post.comments.length
                      : post.commentsCount}
                  </span>
                  <span
                    className="pointer hover"
                    onClick={() => {
                      setShowComment(true);
                      setCommentPostID(post._id);
                    }}
                  >
                    <ChatLeftDots />
                  </span>
                </div>
              </div>
              {showComment && commentPostID === post._id && (
                <article className="bg-light rounded-top ">
                  {post.comments &&
                    post.comments.length > 0 &&
                    post.comments.map((comment, index) => {
                      return (
                        <p key={index} className="commentBody border-bottom">
                          {comment}
                        </p>
                      );
                    })}
                  <article className="p-1 mb-1">
                    <div className="d-flex ">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          newcomment && handleNewComment(post);
                        }}
                      >
                        <input
                          autoFocus
                          placeholder="Write a comment"
                          className="CommentInput"
                          value={newcomment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                          type="submit"
                          className={
                            newcomment
                              ? "primary-btn post-btn "
                              : "primary-btn post-btn opacityLight"
                          }
                        >
                          Post
                        </Button>
                      </form>
                    </div>
                  </article>
                </article>
              )}
              <h6>{post.title}</h6>
              <p className="description textFade">
                {post.description.slice(0, 300) + "..."}
              </p>
              <Link to={`/${post._id}`}>
                <Button
                  className="secondary-btn"
                  // onClick={() => setLoading(true)}
                >
                  Read more
                </Button>
              </Link>
            </div>
          );
        })}
      {!(showAllPosts === posts.length) ? (
        <div className="w-100 text-center mb-3">
          <button
            className="seeMore-btn w-25 m-auto"
            onClick={() => {
              setShowAllPosts(showAllPosts + 2);
            }}
          >
            See more
          </button>
        </div>
      ) : (
        <div className="w-100 text-center mb-3">
          <button
            className="seeMore-btn w-25 m-auto"
            onClick={() => {
              setShowAllPosts(4);
            }}
          >
            See less
          </button>
        </div>
      )}
    </div>
  );
}

export default Posts;
