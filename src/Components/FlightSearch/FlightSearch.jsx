import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';

function FlightSearch() {
  return (
    <div className="p-4 bg-primary text-white rounded">
      <Form>
        {/* Trip Type */}
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Check
              inline
              label="One Way"
              name="tripType"
              type="radio"
              id="oneWay"
              defaultChecked
              className="text-white"
            />
            <Form.Check
              inline
              label="Round Trip"
              name="tripType"
              type="radio"
              id="roundTrip"
              className="text-white"
            />
            <Form.Check
              inline
              label="Multicity"
              name="tripType"
              type="radio"
              id="multiCity"
              className="text-white"
            />
          </Col>
        </Form.Group>

        <Row className="align-items-center mb-3">
          {/* From */}
          <Col md={3}>
            <Form.Control type="text" defaultValue="Delhi(DEL)" />
          </Col>

          {/* Switch icon */}
          <Col xs="auto">
            <Button variant="light">
              <FaExchangeAlt />
            </Button>
          </Col>

          {/* To */}
          <Col md={3}>
            <Form.Control type="text" defaultValue="Mumbai(BOM)" />
          </Col>

          {/* Departure Date */}
          <Col md={2}>
            <Form.Control type="date" defaultValue="2025-08-04" />
          </Col>

          {/* Return Date (disabled) */}
          <Col md={2}>
            <Form.Control type="date" disabled placeholder="Choose Date" />
          </Col>
        </Row>

        {/* Checkboxes */}
        <Row className="mb-3">
          <Col>
            <Form.Check inline label="Defence Forces" />
            <Form.Check inline label="Students" />
            <Form.Check inline label="Senior Citizens" />
            <Form.Check inline label="Doctors Nurses" />
          </Col>
        </Row>

        {/* Travellers and Class */}
        <Row className="align-items-center mb-3">
          <Col md={3}>
            <Form.Select defaultValue="3 Travellers">
              <option>1 Traveller</option>
              <option>2 Travellers</option>
              <option>3 Travellers</option>
              <option>4 Travellers</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select defaultValue="Business">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </Form.Select>
          </Col>
          <Col>
            <Button variant="light" className="fw-bold px-4">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FlightSearch;
