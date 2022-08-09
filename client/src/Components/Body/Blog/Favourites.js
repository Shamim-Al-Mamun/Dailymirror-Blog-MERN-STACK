import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { HeartFill, ChatLeftDots } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

function Favourites() {
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
    <div className="favourites">
      <Container>
        <Row className="w-100 m-auto">
          {favouritePosts && favouritePosts.length > 0 && (
            <h4 className="mb-4 text-center primary-text-color">
              Favourite posts
            </h4>
          )}
          {favouritePosts && favouritePosts.length > 0 ? (
            favouritePosts.map((post) => {
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
                    <Card className="p-3 w-50 m-auto popularPostCard customCard cardMaxMinWidth mb-2 text-black">
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
            })
          ) : (
            <div className="text-center">
              Currently there is no favourite post
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Favourites;
