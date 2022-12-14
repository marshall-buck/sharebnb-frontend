import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import UserContext from "../auth/UserContext";
import { useContext, useState } from "react";
import Alert from "../common/Alert";
import "./PropertyCard.css";

/** Property Card component
 * renders details about a property, link to property details page
 *
 * Props:
 * - property: {id, title, address, description, ownercurretnUsername, key}
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
  const { currentUser } = useContext(UserContext);
  let imgSrc = key ? key : "../no-photo.jpeg";

  /** Click handler for property cards */

  function cardClicked() {
    if (!currentUser) {
      setShowAlert(!showAlert);
    } else {
      navigate(`/properties/${id}`);
    }
    // to={`/properties/${id}
  }
  // to={`/properties/${id}`}
  return (
    <div onClick={cardClicked} style={{ cursor: "pointer" }}>
      <Card className="mb-4 mx-auto text-center Card">
        <div
          style={{
            width: "18rem",
            height: "18rem",
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "18rem",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <CardBody>
          {showAlert && (
            <Alert
              messages={["You must be logged in to view property details"]}
            />
          )}
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle style={{ color: "grey" }}>{address}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
}

export default PropertyCard;
