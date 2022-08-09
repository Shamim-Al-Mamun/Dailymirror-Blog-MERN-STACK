import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { AnimatePresence, motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import UserContext from "../../../Context/UserContext";

function About() {
  const { profile } = useContext(UserContext);

  return (
    <div className="about">
      {profile &&
        profile.length > 0 &&
        profile.map((profile) => {
          return (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 1, y: "3px" }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Container className="py-2">
                  <Row xs={1} md={2} lg={2} className=" py-1 rounded-3">
                    <Col lg={6} md={6}>
                      <img
                        initial={{ opacity: 0, scale: 1, y: "5px" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        src={`/uploads/${profile.displayImage}`}
                        alt="aboutpic"
                        className="aboutPic rounded-3"
                      />
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="mt-2">
                        <h4 className="my-3 text-center primary-text-color">
                          About me
                        </h4>
                        <p className="primary-text-color">{profile.name}</p>
                        <h5 className="my-3">{profile.title}</h5>
                        {profile.passion &&
                          profile.passion.length > 0 &&
                          profile.passion.map((passion) => {
                            return (
                              <Card className="p-4 customCard border-0 secondary-card-color mb-3">
                                <h6>
                                  {Object.keys(passion)
                                    .toString()
                                    .charAt(0)
                                    .toUpperCase() +
                                    Object.keys(passion).toString().slice(1)}
                                </h6>
                                <p className="profileBio">
                                  {passion[Object.keys(passion)]}
                                </p>
                              </Card>
                            );
                          })}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </motion.div>
            </AnimatePresence>
          );
        })}
    </div>
  );
}

export default About;
