import { useState } from "react";
import Alert from "./Alert";


import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

/** Form to upload images
 * Prop
 * - property
 * - uploadImages function
 * State
 * file to upload
*/

function ImageUploadForm({ property, uploadImages }) {
  const [formErrors, setFormErrors] = useState([]);
  const [file, setFile] = useState();

  /** Update form data field */
  function handleChange(evt) {
    const file = evt.target.files[0];
    setFile(file);
    setFormErrors([]);

  }

  /** Handle form submit:
 *
 * Calls login func prop and, if not successful, sets errors.
 */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {

      const res = await uploadImages({ photos: file, id: property.id });
      setFile(null);

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
