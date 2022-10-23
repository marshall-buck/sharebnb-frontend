import UserContext from "./auth/UserContext";
import { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import PropertyList from "./properties/PropertyList";

/** Home  page for app
 *
 *Context: currentUser*
 *
 * App -> RouteList -> Homepage
*/
function Homepage() {

  const { currentUser } = useContext(UserContext);

  return (
    <div
      style={{
        textAlign: 'center',
        // backgroundColor: 'rgba(0,0,0,.1)',
        // color: 'rgba(0,0,0,.6)',
        // width: '100vw',
        // height: '100vh',
      }}>
      <h1>Share B&B</h1>
      <h3>Search for homes and apartments with an outdoor space to rent!</h3>
      {currentUser
        ?
        <p> Welcome back, {currentUser.username} </p>
        :
        <>
          <Link to="/login" >
            <Button color="primary">Log in</Button>
          </Link>
          &nbsp; &nbsp;
          <Link to="/signup" >
            <Button color="primary">Sign up</Button>
          </Link>
        </>
      }
      <PropertyList />

    </div >
  );
}

export default Homepage;