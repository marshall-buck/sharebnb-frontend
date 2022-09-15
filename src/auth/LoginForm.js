
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Alert from "../common/Alert";

/** LoginForm component
 *
 * State: formdata
 *
 * Props:
 * - login: fn()
 *
 * Login form for user login
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({ ...fd, [name]: value }));
    setFormErrors([]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      setFormData("");
      navigate("/properties");
    }
    catch (err) {
      setFormErrors(err);
      return;
    }
  }

  return (
    <Container >
      <Row>
        <Col
          className="bg-white bg-opacity-50 border rounded"
          md={{ offset: 3, size: 6 }}
          sm="12">
          <Form
            onSubmit={handleSubmit}
            style={{ padding: "0.5rem" }}>
            <legend>Log In:</legend>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Label for="password">Password:</Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
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
  );
}

export default LoginForm;