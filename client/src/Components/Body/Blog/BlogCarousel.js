import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";
import Shuffle from "../../../utils/Shuffle";

function BlogCarousel() {
  const { posts } = useContext(UserContext);
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    let copyPosts = [...posts];
    let randomPost = Shuffle(copyPosts);
    if (randomPost) {
      setRandomPosts(randomPost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="blogCarousel">
        <Carousel fade>
          {randomPosts &&
            randomPosts.length > 0 &&
            randomPosts.slice(0, 5).map((post, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="w-100 carouselImg"
                    src={`/uploads/${post.postImage}`}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <AnimatePresence>
                      <motion.p
                        initial={{ opacity: 0, scale: 1, y: "5px" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="small red"
                      >
                        Top trending now
                      </motion.p>
                    </AnimatePresence>
                    <AnimatePresence>
                      <motion.h3
                        style={{ color: "white" }}
                        initial={{ opacity: 0, scale: 1, y: "5px" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {post.title}
                      </motion.h3>
                    </AnimatePresence>
                    <AnimatePresence>
                      <Link to={`/${post._id}`}>
                        <motion.button
                          initial={{ opacity: 0, scale: 1, y: "5px" }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="carousel-btn"
                        >
                          Read more
                        </motion.button>
                      </Link>
                    </AnimatePresence>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    </>
  );
}

export default BlogCarousel;
