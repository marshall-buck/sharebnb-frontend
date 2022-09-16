import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareBnB from "../api/api";
import { Container, Row, Button } from "reactstrap";
import SendMessageForm from "../messages/SendMessageForm";
import BookingForm from "./BookingForm";



//TODO: booking
/** PropertyDetails: id, description and list of all jobs of one Property
 *
 * Props:
 * - book fn()
 * - sendMsg fn()
 *
 * State:
 * - Property = {id, title, address, description, ownerUsername, images}
 *
 *
 * App -> PropertyDetails -> SendMessageForm
 */

function PropertyDetails({ book, sendMsg }) {

  const [property, setProperty] = useState({
    data: null,
    isLoading: true
  });

  const { id } = useParams();

  /* calls api to get a property by id */
  useEffect(function fetchPropertyDetail() {
    async function fetchProperty() {
      const result = await ShareBnB.getProperty(id);
      setProperty({
        data: result,
        isLoading: false
      });
    }
    fetchProperty();
  }, [id]);


  if (property.isLoading) return <h1>LOADING...</h1>;

  return (
    <Container>
      <Row style={{ margin: '20px' }}>
        <h2> {property.data.title}</h2>

        <img style={{ width: '300px' }} src={property.data.images[0] ?
          property.data.images[0].key :
          "../no-photo.jpeg"} alt={property.data.title} />
        <p> {property.data.description}</p>
        <p> {property.data.address}</p>
        <p> {property.data.ownerUsername}</p>
      </Row>

      <BookingForm propertyId={property.data.id} />
      <SendMessageForm sendMsg={sendMsg} toUsername={property.data.ownerUsername} />
    </Container>

  );
}
export default PropertyDetails;