import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";

import UserContext from "../../../Context/UserContext";

function Subscription() {
  const { subscriptions } = useContext(UserContext);

  return (
    <div className="subscription">
      <Container>
        <section className="m-5">
          <h6>All subscriptions:</h6>
          <Table striped bordered hover className="m-0">
            <thead className="bg-secondary text-dark">
              <tr className="text-center">
                <th className="text-center">#</th>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions &&
                subscriptions.length &&
                subscriptions.length > 0 &&
                subscriptions.map((email, index) => {
                  return (
                    <tr key={index} className="text-center small">
                      <td>{index + 1}</td>
                      <td>{email.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="line w-100 m-0 bg-secondary"></div>
        </section>
      </Container>
    </div>
  );
}

export default Subscription;
