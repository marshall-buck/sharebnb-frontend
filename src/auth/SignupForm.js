import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText, Button, Card, CardBody, } from "reactstrap";
import Alert from "../common/Alert";

import { useNavigate } from "react-router-dom";





/** Signup form to register a user,
 *  on success redirects to properties page
 *
 * Props:
 * - signup function
 *
 * State:
 * - formData:  {username,password,  firstName, lastName, phone, email}
 * - formErrors: array of formErrors
 *
 * App-> Routes -> SignupForm -> Alert

 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt.target);
    try {
      await signup(formData);

      navigate("/properties");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Updates formDate state from inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3 text-center">Sign Up</h2>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>

              {/* USERNAME */}
              <FormGroup>
                <Label>
                  Username
                </Label>
                <Input
                  name="username"

                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* PASSWORD */}
              <FormGroup>
                <Label>
                  Password
                </Label>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* FIRST NAME */}
              <FormGroup>
                <Label>
                  First Name
                </Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* LAST NAME */}
              <FormGroup>
                <Label>
                  Last Name
                </Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* PHONE */}
              <FormGroup>
                <Label>
                  Phone
                </Label>

                <Input
                  name="phone"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <FormText>123-456-7890</FormText>
              </FormGroup>

              {/* EMAIL */}
              <FormGroup>
                <Label>
                  Email
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="d-grid">

                {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}
                <Button color="primary">Submit</Button></FormGroup>

            </Form>
          </CardBody>

        </Card>


      </div>
    </div>
  );
}

export default SignupForm;