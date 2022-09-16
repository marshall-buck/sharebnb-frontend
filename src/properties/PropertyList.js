import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import SearchForm from "../common/SearchForm";
import PropertyCard from "./PropertyCard";
import ShareBnB from "../api/api";

/** PropertiesList component, displays all properties
 *
 *
 * State:
 * - properties [{property}, ...]
 *
 * App -> RouteList -> PropertyList -> SearchForm
 */

function PropertyList() {

  const [properties, setProperties] = useState({
    data: [],
    isLoading: true
  });

  /* calls api to get all properties */
  useEffect(function fetchPropertiesList() {
    async function fetchProperties() {
      const result = await ShareBnB.getProperties();
      setProperties({
        data: result,
        isLoading: false
      });
    }
    fetchProperties();
  }, []);

  // call getCompany by search description
  async function search(description) {
    const result = await ShareBnB.getProperties(description);
    setProperties({
      data: result,
      isLoading: false
    });
  }

  if (properties.isLoading) return <i>Loading...</i>;

  return (
    <Container>
      <Row>
        <Col
          className=""
          md={{
            offset: 3,
            size: 8
          }}
          sm="12">
          <SearchForm search={search} />
        </Col>
      </Row>
      <Row xs='1' sm='1' md='2' lg='3' xxl='4'>
        {properties.data.length > 0
          ?
          properties.data.map(p => (
            <Col
              className=""
              key={p.id}>
              < PropertyCard property={p} />
            </Col>
          ))
          :
          <p>No properties found!</p>
        }
      </Row>
    </Container>
  );
}
export default PropertyList;