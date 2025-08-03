import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

const ViewPolicyModal = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const policies = [
    {
      title: "Local Travel",
      content:
        "Cab should only be taken to places within the serviceable city. Else driver has the right to deny.",
    },
    {
      title: "Waiting Charges",
      content:
        "Driver would wait maximum 10 minutes from your scheduled pickup time at your pickup location. Post this, your trip may get cancelled without any refund. If agreed, waiting charges will be Rs 1.75/min.",
    },
    {
      title: "Driver Details",
      content:
        "Driver details will be shared up to 15 mins prior to departure. If details differ, contact support.",
    },
    {
      title: "Delays",
      content:
        "Due to traffic or any other unavoidable reason, pickup may be delayed by 30 mins.",
    },
    {
      title: "Charged KM",
      content:
        "The kilometers will be charged starting from pickup location and ending at final drop location.",
    },
    {
      title: "Trip Time",
      content: "Trip time will be counted from the pickup time.",
    },
    {
      title: "Cab Category",
      content:
        "The booking is for cab type SEDAN. Model preference (Dzire, Etios or similar) not guaranteed.",
    },
    {
      title: "Receipts",
      content:
        "Collect receipts directly from the driver for any extra charges. MMT not liable for these.",
    },
    {
      title: "Trip Duration",
      content:
        "Post package inclusions, extra Km and hour charges apply. Pay directly to driver.",
    },
    {
      title: "Luggage Policy",
      content:
        "SEDAN has space for 1 luggage bag. Seating can be adjusted with driver consent.",
    },
  ];

  return (
    <>
      {/* View Policy Link */}
      <Button
        variant="link"
        className="text-primary p-0 fw-semibold"
        onClick={handleShow}
      >
        View Policy
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Important Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {policies.map((item, idx) => (
            <div key={idx} className="mb-3">
              <strong>{item.title}</strong>
              <p className="mb-1 small text-muted">{item.content}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewPolicyModal;