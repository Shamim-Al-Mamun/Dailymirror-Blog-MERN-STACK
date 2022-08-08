import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { MdMail, MdSecurity } from "react-icons/md";

import UserContext from "../../../Context/UserContext";

function PassAndSecurity() {
  const { user } = useContext(UserContext);
  return (
    <div className="passAndsecurity">
      <Container>
        <Card className="p-3 bg-light w-50 m-auto cardMaxMinWidth">
          <>
            <div className="d-flex align-items-center mb-3">
              <span className="me-1">
                <MdMail />
              </span>
              <div className="w-75 m-0 small">
                <span className="small">{user.email}</span>{" "}
              </div>
              <div className="w-25 ">
                <Link to="/settings/security/changemail">
                  <button className="edit-btn">Change</button>
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <span className="me-1">
                <MdSecurity />
              </span>
              <div className="w-75 m-0 small">******</div>
              <div className="w-25 ">
                <Link to="/settings/security/changepassword">
                  <button className="edit-btn">Change</button>
                </Link>
              </div>
            </div>
          </>
        </Card>
      </Container>
    </div>
  );
}
export default PassAndSecurity;
