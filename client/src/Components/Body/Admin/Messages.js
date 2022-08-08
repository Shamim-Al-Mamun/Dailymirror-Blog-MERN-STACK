import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { MdLockClock } from "react-icons/md";

import UserContext from "../../../Context/UserContext";

const getTimestamp = (time) => {
  const timestamp = new Date().getTime();
  return Math.floor((timestamp - time) / 60000) <= 0
    ? "just now"
    : Math.floor((timestamp - time) / 60000) < 59
    ? Math.floor((timestamp - time) / 60000) + "m ago"
    : Math.floor((timestamp - time) / 3600000) < 23
    ? Math.floor((timestamp - time) / 3600000) + "h ago"
    : Math.floor((timestamp - time) / 86400000) < 30
    ? Math.floor((timestamp - time) / 86400000) + "d ago"
    : Math.floor((timestamp - time) / 2592000000) < 12
    ? Math.floor((timestamp - time) / 2592000000) + "m ago"
    : Math.floor((timestamp - time) / 31104000000) + "y ago";
};
function Messages() {
  const { contacts } = useContext(UserContext);

  return (
    <div className="messages">
      <Container>
        <section>
          <h6>All Messages:</h6>
          {contacts &&
            contacts.length &&
            contacts.length > 0 &&
            contacts.map((email, index) => {
              return (
                <Card className="mb-2 py-2 small  text-black  bg-light minWidth">
                  <ul key={index} className="small">
                    <div className="d-flex justify-content-between">
                      <h6>{email.subject}</h6>
                      <div className="small w-25 text-end">
                        <MdLockClock />{" "}
                        <span className="small">
                          {getTimestamp(email.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="m-0 small">{email.message}</p>
                    <h6 className="m-0 small">
                      <span>Email:</span>{" "}
                      <span className="fst-normal text-info text-decoration-underline">
                        {email.email}
                      </span>
                    </h6>
                    <span className="blockquote-footer">
                      <span>sent by</span>{" "}
                      <span className="fst-italic">{email.name}</span>
                    </span>
                  </ul>
                </Card>
              );
            })}
        </section>
      </Container>
    </div>
  );
}

export default Messages;
