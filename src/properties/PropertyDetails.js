import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ShareBnB from "../api/api";
import { Container, Row, Button } from "reactstrap";
import SendMessageForm from "../messages/SendMessageForm";


/**PropertyDetail: id, description and list of all jobs of one Property
 *
 * State:
 * - Property = {id, title, address, description, ownerUserid, images}
 *
 * Effect:
 * - call getProperty() on mount and when id changes
 *
 * PropertyDetail -> JobCardList
 */
function PropertyDetail({ book, sendMsg }) {
  const [property, setProperty] = useState({
    data: null,
    isLoading: true
  });

  const { id } = useParams();

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
        <img src={property.data.images[0].key} alt={property.data.title} />
        <p> {property.data.description}</p>
        <p> {property.data.address}</p>
        <p> {property.data.ownerUsername}</p>
      </Row>

      <Button disabled >Book!</Button>

      <SendMessageForm sendMsg={sendMsg} toUsername={property.data.ownerUsername}/>
    </Container>

  );
}
export default PropertyDetail;