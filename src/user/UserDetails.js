import { useContext } from "react";
import { Container, Card, CardTitle, CardBody } from "reactstrap";
import UserContext from "../auth/UserContext";


/**UserDetails: id, description and list of all jobs of one Property
 *
 * Context:
 * - user = {username, firstName, lastName, phone, email}
 *
 *
 * App -> RouteList -> UserDetails
 */
function UserDetails() {
  const { currentUser } = useContext(UserContext);

  return (
    <Container >
      <Card className="shadow-sm" style={{ margin: '20px', padding: "2rem" }}>
        <CardTitle tag="h2">{currentUser.firstName} {currentUser.lastName}</CardTitle>
        <CardBody>
        <p> username: {currentUser.username}</p>
        <p> email: {currentUser.email}</p>
        <p> phone: {currentUser.phone}</p>
        </CardBody>
      </Card>
    </Container>
  );
}
export default UserDetails;