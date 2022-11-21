import { useEffect, useState } from "react";
import { Container, Row, Col, CardGroup } from "reactstrap";
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
    isLoading: true,
  });

  /* calls api to get all properties */
  useEffect(function fetchPropertiesList() {
    async function fetchProperties() {
      const result = await ShareBnB.getProperties();
      setProperties({
        data: result,
        isLoading: false,
      });
    }
    fetchProperties();
  }, []);

  // call getCompany by search description
  async function search(description) {
    const result = await ShareBnB.getProperties(description);
    setProperties({
      data: result,
      isLoading: false,
    });
  }

  if (properties.isLoading) return <i>Loading...</i>;

  return (
    <Container>
      <Row>
        <Col>
          <SearchForm search={search} />
        </Col>
      </Row>
      <CardGroup className="justify-content-between">
        {properties.data.length > 0 ? (
          properties.data.map((p) => (
            <PropertyCard key={`${p.id}:${p.key}`} property={p} />
          ))
        ) : (
          <p>No properties found!</p>
        )}
      </CardGroup>
    </Container>
  );
}
export default PropertyList;
