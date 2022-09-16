import { useState } from "react";
import Alert from "./Alert";


import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

/** Form to upload images, redirects to property details page o success
 *
 * Prop:
 * - property {id, title, description, price, images, ownerUsername}
 * - uploadImages function
 *
 * State:
 * - file to upload
 * - formErrors: array
 *
 * CreatePropertyForm -> ImageUploadForm -> Alert
 */

function ImageUploadForm({ property, uploadImages }) {
  const [formErrors, setFormErrors] = useState([]);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  /** Update form data field */
  function handleChange(evt) {
    const file = evt.target.files[0];
    setFile(file);
    setFormErrors([]);

  }

  /** Handles form submit, and redirect  */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormErrors([]);
    try {
      await uploadImages({ photos: file, id: property.id });
      setFile(null);
      navigate(`/properties/${property.id}`);
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }




  return (
    <Form className="container" encType="multipart/form-data" onSubmit={handleSubmit}>

      <FormGroup>
        <Label for="file">File</Label>
        <Input required id="file" name="file" type="file" onChange={handleChange} />
        <FormText>
          Choose one file to upload
        </FormText>
      </FormGroup>
      {formErrors.length
        ? <Alert type="danger" messages={formErrors} />
        : null}
      <Button>Submit</Button>
    </Form>

  );
}
export default ImageUploadForm;
