import React, { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

import contactpic from "../../../assets/images/contactpic.jpg";
import UserContext from "../../../Context/UserContext";

function Contact() {
  const { contacts, setContacts } = useContext(UserContext);
  const [contactMessage, setContactMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const handleContactMessage = (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    if (
      contactMessage.name &&
      contactMessage.email &&
      contactMessage.subject &&
      contactMessage.message
    ) {
      axios
        .post(`${baseURL}/contact`, {
          ...contactMessage,
          timestamp: timestamp,
        })
        .then((res) => {
          console.log(res.data);
          const newContact = res.data.New_contact;
          setContacts([...contacts, newContact]);
        })
        .catch((err) => {
          console.log(err);
        });
      setContactMessage({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setMessage("Message sent successfully");
    } else {
      setMessage("Please fill up all the fields!");
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: "3px" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container className="py-5">
          <Row xs={1} md={2} lg={2} className="py-2">
            <Col lg={6} md={6}>
              <div className="my-3">
                <h4 className="my-4 text-center primary-text-color">
                  Contact me
                </h4>
                <form onSubmit={handleContactMessage}>
                  <Card className="p-4 mb-3 customCard">
                    <div className="message small">
                      {message && (
                        <p
                          className={
                            message.length > 25
                              ? "small text-danger"
                              : "small text-success"
                          }
                        >
                          {message}
                        </p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <input
                        placeholder="Name"
                        className={
                          message.length > 25
                            ? contactMessage.name
                              ? "width45"
                              : "width45 form-control is-invalid"
                            : "width45"
                        }
                        value={contactMessage.name}
                        onChange={(e) =>
                          setContactMessage({
                            ...contactMessage,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        className={
                          message.length > 25
                            ? contactMessage.email
                              ? "width45"
                              : "width45 form-control is-invalid"
                            : "width45"
                        }
                        value={contactMessage.email}
                        onChange={(e) =>
                          setContactMessage({
                            ...contactMessage,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <input
                      placeholder="Subject"
                      className={
                        message.length > 25
                          ? contactMessage.subject
                            ? "mb-3"
                            : "mb-3 form-control is-invalid"
                          : "mb-3"
                      }
                      value={contactMessage.subject}
                      onChange={(e) =>
                        setContactMessage({
                          ...contactMessage,
                          subject: e.target.value,
                        })
                      }
                    />
                    <textarea
                      placeholder="Message"
                      className={
                        message.length > 25
                          ? contactMessage.message
                            ? "mb-3"
                            : "mb-3 form-control is-invalid"
                          : "mb-3"
                      }
                      value={contactMessage.message}
                      onChange={(e) =>
                        setContactMessage({
                          ...contactMessage,
                          message: e.target.value,
                        })
                      }
                    />
                    <Button type="submit" className="primary-btn">
                      Send
                    </Button>
                  </Card>
                </form>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <img
                src={contactpic}
                alt="contactpic"
                className="contactPic mt-2 rounded-3"
              />
            </Col>
          </Row>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}

export default Contact;
