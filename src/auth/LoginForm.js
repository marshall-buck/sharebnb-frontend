
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
 * State:
 * -formData:  { name. password }
 * -formErrors: array
 *
 * Props:
 * - login: fn()
 *
 * Login form for user login
 * redirects to properties page on success
 *
 * App-> NavBar -> RouteList -> Login -> Alert */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();


  /** Updates formDate state from inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({ ...fd, [name]: value }));
    setFormErrors([]);
  }

  /** Handles form submit, redirects to properties */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      setFormData("");
      // TODO: redirect
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
          className="bg-white bg-opacity-50 border rounded shadow-sm"
          md={{ offset: 3, size: 6 }}
          sm="12">
          <Form
            onSubmit={handleSubmit}
            style={{ padding: "0.5rem" }}>
            <legend>Log In:</legend>
            <FormGroup>

              {/* USERNAME */}
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

              {/* PASSWORD */}
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
            <Button className="mb-2" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;