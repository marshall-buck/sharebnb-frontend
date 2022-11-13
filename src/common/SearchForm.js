import { useState } from "react";
import { Form, Input, Button, Row, Col, InputGroup, InputGroupText } from "reactstrap";

/** Search form component
 *
 * Props:
 * - search: fn() for search by term on submit
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
      <Row>
        <InputGroup className="mb-4">

          <Input
            value={searchTerm}
            name="searchTerm"
            onChange={handleChange}
            placeholder="Enter search term..."
          />
          <Button>Search!</Button>

        </InputGroup>
      </Row>
    </Form>
  );
}

export default SearchForm;