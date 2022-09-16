import { useState } from "react";

import Alert from "../common/Alert";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

/** Form to send message
 * Props:
 * - sendMsg fn()
 * - toUsername
 *
 * State:
 * - saveConfirmed: boolean
 * - formData: {toUsername, body}
 *
 * App -> RouteList -> SendMessageForm  -> Alert */

function SendMessageForm({ sendMsg, toUsername }) {

  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    toUsername: toUsername || "",
    body: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  /** Handle form submit:
   *
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await sendMsg(formData);
      setSaveConfirmed(true);
    } catch (err) {
      setFormErrors(err);
      return;
    }
  }

  return (
    <Form onSubmit={handleSubmit} style={{ padding: "0.5rem" }}>
      <legend>Send Message</legend>

      <FormGroup>
        <Label for="toUsername">To:</Label>
        <Input
          id="toUsername"
          name="toUsername"
          value={formData.toUsername}
          onChange={handleChange}
          required
        />

        <Label for="body">Message Body:</Label>
        <Input
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          type="textarea"
          required
        />

      </FormGroup>

      {formErrors.length
        ? <Alert type="danger" messages={formErrors} />
        : null}
      {saveConfirmed
        ?
        <Alert type="success" messages={["Message sent!"]} />
        : null}
      <Button color="primary">Send Message</Button>
    </Form>

  );
}

export default SendMessageForm;
