import { useState } from "react";

import Alert from "../common/Alert";
import ImageUploadForm from "../common/ImageUploadForm";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

/** Form to create a Property
 * Props
 * - createProperty
 * -uploadImages
 * State
 * -formData
 *   {title, address, description ,price}
 */

function CreatePropertyForm({ createProperty, uploadImages }) {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    price: "",
  });
 
  const [formErrors, setFormErrors] = useState([]);
  const [property, setProperty] = useState(null);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const property = await createProperty(formData);
      setProperty(property);
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }



  return (
    <div>
      {property ? (
        <ImageUploadForm property={property} uploadImages={uploadImages} />
      ) : (
        <Container>
          <Row>
            <Col
              className="bg-white bg-opacity-50 border rounded"
              md={{ offset: 3, size: 6 }}
              sm="12"
            >
              <Form onSubmit={handleSubmit} style={{ padding: "0.5rem" }}>
                <legend>List Property</legend>

                <FormGroup>
                  <Label for="title">Listing Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <Label for="address">Address:</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                  <Label for="description">Description:</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="text"
                    required
                  />

                  <Label for="price">Price per day:</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </FormGroup>

                {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default CreatePropertyForm;
