import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { HeartFill, ChatLeftDots } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function PopularPost() {
  const { posts } = useContext(UserContext);

  if (posts && posts.length > 0) {
    var mostFavourites = posts.map((post) => {
      return post.favouritesCount;
    });
    var sorted = mostFavourites.slice().sort((a, b) => a - b);
    var FilteredPost = posts.filter(
      (post) => post.favouritesCount >= sorted[sorted.length - 5]
    );
  }

  return (
    <div className="popuplar">
      <Container>
        <Row className="w-100 m-auto">
          {FilteredPost &&
            FilteredPost.length > 0 &&
            FilteredPost.map((post) => {
              return (
                <Col
                  lg={4}
                  md={6}
                  sm={4}
                  className="d-flex justify-content-center"
                >
                  <Link
                    to={`/${post._id}`}
                    className="text-black text-decoration-none"
                  >
                    <Card className="p-3 bg-light w-50 m-auto popularPostCard cardMaxMinWidth mb-2 bg-light">
                      <img
                        src={`/uploads/${post.postImage}`}
                        alt="latestpostpic1"
                        className="latestPic rounded-top"
                      />
                      <div className="popoularPostDetails">
                        <p className="popularPostTitle mb-1 text-center">
                          {post.title.slice(0, 100) + "..."}
                        </p>
                        <div className="favNcom">
                          <span className="me-2">{post.favouritesCount}</span>
                          <span>
                            <HeartFill className="heartFill pointer" />
                          </span>
                          <span className="mx-2">
                            {post.comments && post.comments.length > 0
                              ? post.comments.length
                              : post.commentsCount}
                          </span>
                          <span className="pointer hover">
                            <ChatLeftDots />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default PopularPost;
