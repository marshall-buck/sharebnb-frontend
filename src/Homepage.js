import UserContext from "./auth/UserContext";
import { useContext } from "react";
import { Button, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import PropertyList from "./properties/PropertyList";

/** Home  page for app
 *
 *Context: currentUser*
 *
 * App -> RouteList -> Homepage
 */
function Homepage() {
  // const { currentUser } = useContext(UserContext);

  return (
    <Container >

      {" "}
      <Row className="text-center">
        <h1>Share B&B</h1>
      </Row>
      <Row className="text-center">
        <h3>
          Search for homes and apartments with an outdoor space to rent!
        </h3>
      </Row>


      {/* {currentUser ? (
        <p> Welcome back, {currentUser.username} </p>
      ) : (
        <>
          <Link to="/login">
            <Button color="primary">Log in</Button>
          </Link>
          &nbsp; &nbsp;
          <Link to="/signup">
            <Button color="primary">Sign up</Button>
          </Link>
        </>
      )} */}
      <PropertyList />
    </Container>
  );
}

export default Homepage;
