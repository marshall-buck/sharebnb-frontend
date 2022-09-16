import { useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import UserContext from "../auth/UserContext";


/**UserDetails: id, description and list of all jobs of one Property
 *
 * State:
 * - user = {username, firstName, lastName, phone, email}
 *
 * Effect:
 * - call getProperty() on mount and when id changes
 *
 * UserDetails -> JobCardList
 */
function UserDetails({ book, sendMsg }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Container style={{
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,.1)',
      color: 'rgba(0,0,0,.6)',
      width: '100vw',
      height: '100vh',
    }}>
      <Row style={{ margin: '20px' }}>
        <h2> Hello {currentUser.firstName} {currentUser.lastName}</h2>
        <p> username: {currentUser.username}</p>
        <p> Email: {currentUser.email}</p>
        <p> Phone: {currentUser.phone}</p>
      </Row>
    </Container>

  );
}
export default UserDetails;