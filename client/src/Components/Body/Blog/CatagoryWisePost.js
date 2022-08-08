import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useParams, Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HashLoader from "react-spinners/HashLoader";
import { Heart, HeartFill, ChatLeftDots } from "react-bootstrap-icons";

import UserContext from "../../../Context/UserContext";
import Timestamp from "../../../utils/Timestamp";

function CatagoryWisePost() {
  const { postCat } = useParams();
  const { posts, setPosts, favourites, setFavourites } =
    useContext(UserContext);

  const [newcomment, setNewComment] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [commentPostID, setCommentPostID] = useState(false);

  //API URL
  const baseURL = process.env.React_APP_API_URL;
  //Theme Color
  var colors = JSON.parse(localStorage.getItem("colors"));
  const setColors = (color) => {
    var root = document.querySelector(":root");
    root.style.setProperty("--primary-color", color[0]);
    root.style.setProperty("--primary-color-light", color[1]);
    root.style.setProperty("--primary-color-deep", color[2]);
  };

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

  if (posts && posts.length > 0) {
    var FilteredPost = posts.filter((post) => post.catagory === postCat);
  }
  useEffect(() => {
    if (colors) {
      setColors(colors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-100 py-3">
      {FilteredPost && FilteredPost.length > 0 ? (
        FilteredPost.map((post) => {
          return (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 1, y: "10px" }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Container className="pt-5">
                  <div className="text-start mb-4" key={post._id}>
                    <img
                      src={`/uploads/${post.postImage}`}
                      alt="post1pic"
                      className="w-100 rounded-3 pointer"
                    />
                    <div className="d-flex justify-content-between user-select-none">
                      <div className="d-flex mx-2">
                        <p className="catagory">{post.catagory}</p>
                        {post.timestamp && (
                          <p className="date ms-2">
                            {Timestamp(post.timestamp)}
                          </p>
                        )}
                      </div>
                      <div className="favNcom">
                        <span className="me-2">{post.favouritesCount}</span>
                        {favourites && favourites.length > 0 ? (
                          favourites.filter(
                            (favourite) => favourite === post._id
                          ).length > 0 ? (
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
                          post.comments.map((comment) => {
                            return (
                              <p className="commentBody border-bottom">
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
                      <Button className="secondary-btn">Read more</Button>
                    </Link>
                  </div>
                </Container>
              </motion.div>
            </AnimatePresence>
          );
        })
      ) : (
        <div className="d-flex justify-content-center">
          <div className="mt-5">
            {colors ? (
              <HashLoader color={colors[0]} size={100} />
            ) : (
              <HashLoader color="#9b4b64" size={100} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CatagoryWisePost;
