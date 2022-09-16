import { useState } from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import Alert from "../common/Alert";
import ShareBnB from "../api/api";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
 *  Booking form for properties
 *
 * State-
 * -formData {startDate, endDate}
 *
 * PropertyDetails -> BookingForm
  *
 */

function BookingForm({ propertyId }) {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);



  /** handles booking submit */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setSaveConfirmed(false);
    setFormErrors([]);
    try {

      await ShareBnB.bookProperty({ startDate, endDate, propertyId });
      setSaveConfirmed(true);

    } catch (err) {
      setFormErrors(err);

      return;
    }

  }

  return (

    <Form onSubmit={handleSubmit}>
      <legend>Book this property</legend>
      <FormGroup> <Label>Start Date</Label>
        <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} /></FormGroup>
      <FormGroup> <Label>End Date</Label>
        <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} /></FormGroup>

      {formErrors.length
        ? <Alert type="danger" messages={formErrors} />
        : null}
      {saveConfirmed
        ?
        <Alert type="success" messages={["Property Booked!"]} />
        : null}
      <Button color="primary">Book Dates</Button>
    </Form>

  );



}

export default BookingForm;

