import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Posts from "./Posts";
import Profile from "./Profile";
import Catagories from "./Catagories";
import LatestPost from "./LatestPost";
import Instagram from "./Instagram";
import FavouriteList from "./FavouriteList";

function BlogBody() {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  function handleWindowResize() {
    setCurrentWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [currentWidth]);
  return (
    <>
      <Container className="w-100 my-3">
        <Row className="blog" xs={1} md={2} lg={2}>
          {currentWidth < 750 && (
            <Col className="" lg={6} md={6}>
              <Posts />
            </Col>
          )}
          <Col className="" lg={3} md={3}>
            <Profile />
            <FavouriteList />
          </Col>
          {currentWidth > 750 && (
            <Col className="" lg={6} md={6}>
              <Posts />
            </Col>
          )}
          <Col className="" lg={3} md={3}>
            <Catagories />
            <LatestPost />
          </Col>
        </Row>
      </Container>
      <Instagram />
    </>
  );
}

export default BlogBody;
