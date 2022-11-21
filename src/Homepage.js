import { Container, Row } from "reactstrap";
import PropertyList from "./properties/PropertyList";

/** Home  page for app
 *
 *Context: currentUser*
 *
 * App -> RouteList -> Homepage
 */
function Homepage() {
  return (
    <Container>
      <Row className="text-center">
        <h1>Share B&B</h1>
      </Row>
      <Row className="text-center">
        <h3>Search for homes and apartments with an outdoor space to rent!</h3>
      </Row>
      <PropertyList />
    </Container>
  );
}

export default Homepage;
