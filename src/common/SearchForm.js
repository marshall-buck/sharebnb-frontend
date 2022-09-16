import { useState } from "react";
import { Form, Input, Button, Row, Col } from "reactstrap";

/** Search form component
 *
 * Props:
 * - seach: fn() for seach by term on submit
 *
 * State:
 * - term = null by default or string of search term
 *
 * App -> RouteList -> { PropertiesList } -> SearchForm
 */
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }


  return (
    <Form
      onSubmit={handleSubmit}>
      <Row
        className=""
        style={{ margin: "2rem" }}>
        <Col>
          <Input
            value={searchTerm}
            name="searchTerm"
            onChange={handleChange}
            placeholder="Enter search term..."
          />
        </Col>
        <Col>
          <Button>Search!</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;