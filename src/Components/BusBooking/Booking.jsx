import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Collapse, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BusBooking = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  const cabs = [
    {
      name: "Indica, Swift",
      price: 425,
      type: "CNG",
      seats: 4,
      rating: 4.2,
    },
    {
      name: "Dzire, Etios",
      price: 467,
      type: "CNG",
      seats: 4,
      rating: 4.2,
    },
    {
      name: "Xylo, Ertiga",
      price: 637,
      type: "CNG",
      seats: 6,
      rating: 4.0,
    },
    {
      name: "Innova Crysta",
      price: 2999,
      type: "Diesel",
      seats: 6,
      rating: 4.5,
      isExact: true,
    },
  ];

  return (
    <Container fluid className="p-3">
      {/* Top Filters */}
      <div className="d-flex flex-wrap gap-3 mb-3">
        <Form.Control type="text" placeholder="Pick-up Location" defaultValue="Khan Market" />
        <Form.Control type="text" placeholder="Date" defaultValue="03 Aug 2025" />
        <Form.Control type="text" placeholder="Time" defaultValue="10:00 AM" />
        <Form.Control type="text" placeholder="Package" defaultValue="1hr 10kms" />
        <Button variant="primary">Search</Button>
        <Button
          variant="outline-secondary"
          className="d-md-none"
          onClick={toggleFilters}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <Row>
        {/* Filters Sidebar - Show only on md+ or collapse in mobile */}
        <Col md={3}>
          <Collapse in={showFilters || window.innerWidth >= 768}>
            <div>
              <Card className="p-3 mb-3">
                <h5>Filters</h5>
                <Form.Check type="checkbox" label="Hatchback" />
                <Form.Check type="checkbox" label="Sedan" />
                <Form.Check type="checkbox" label="SUV" />
                <hr />
                <Form.Check type="checkbox" label="CNG" />
                <Form.Check type="checkbox" label="Diesel" />
                <hr />
                <Form.Check type="checkbox" label="Innova Crysta" />
              </Card>
            </div>
          </Collapse>
        </Col>

        {/* Cab Cards */}
        <Col md={9}>
          {cabs.map((cab, idx) => (
            <Card key={idx} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <Card.Title className="mb-1">
                    {cab.name}{" "}
                    {cab.isExact && (
                      <span className="badge bg-success">NEW</span>
                    )}
                  </Card.Title>
                  <Card.Text className="mb-1">
                    {cab.seats} Seats • AC • {cab.type}
                  </Card.Text>
                  <small className="text-muted">Rating: {cab.rating}</small>
                </div>
                <div className="text-end">
                  <h5>₹{cab.price}</h5>
                  <small className="text-muted">+ ₹95 Taxes</small>
                  <div>
                    <Button variant="primary" className="mt-2">
                      Select Cab
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BusBooking;