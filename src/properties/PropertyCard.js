import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import UserContext from "../auth/UserContext";
import { useContext, useState } from "react";
import Alert from '../common/Alert';
import "./PropertyCard.css";

/** Property Card component
 * renders details about a property, link to property details page
 *
 * Props:
 * - property: {id, title, address, description, ownerUsername, key}
 *
 * State:
 * - none
 *
 * App -> RouteList -> CompanyList -> PropertyCard
 */

function PropertyCard({ property }) {

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { id, title, address, key } = property;
  const { user } = useContext(UserContext);
  let imgSrc = key ? key : "../no-photo.jpeg";

  function cardClicked() {
    console.log(id, user);
    if (!user) {
      setShowAlert(!showAlert);
    } else {
      navigate(`/properties/${id}`);
    }
    // to={`/properties/${id}
  }

  return (
    <NavLink onClick={cardClicked}  >
      <Card
        className="Card mb-4"
        style={{
          width: '18rem',
          height: '26rem',
          border: '0px',
          backgroundColor: 'rgba(0,0,0,.1)',
          color: 'black',
        }}
      >
        <div style={{
          width: '18rem', height: '18rem', backgroundImage: `url(${imgSrc})`,
          backgroundSize: '18rem', backgroundRepeat: 'no-repeat'
        }}></div>
        <CardBody>
          {showAlert && <Alert messages={['You must be logged in to view', 'Click again to dismiss']} />}
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle style={{ color: 'grey' }}>{address}</CardSubtitle>
        </CardBody>
      </Card>
    </NavLink>
  );
}

export default PropertyCard;