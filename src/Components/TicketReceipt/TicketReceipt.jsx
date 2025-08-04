import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import { formatDateMain } from "../../Utils/timeFormater";

const TicketReceipt = ({ show, setShow, bookedDetails, seatNumber }) => {
  const receiptRef = useRef(null);
  const handleClose = () => setShow(false);
  const { busDetails } = useSelector((state) => state.booking);
  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    const opt = {
      margin: 0.5,
      filename: `ticket_receipt_${bookedDetails?.id || "unknown"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    await html2pdf().from(element).set(opt).save();
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.cloneNode(true);
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Ticket</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
          }
          .ticket-receipt {
            max-width: 600px;
            margin: auto;
            padding: 20px;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 12px;
          }
          .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            margin-bottom: 8px;
          }
          .col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
          strong {
            display: block;
            color: #555;
            margin-bottom: 4px;
          }
          .title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 25px;
            color: #007bff;
          }
          .footer {
            margin-top: 25px;
            font-style: italic;
            text-align: center;
            font-size: 13px;
            color: gray;
          }
        </style>
      </head>
      <body>
        <div class="ticket-receipt">${printContent.outerHTML}</div>
      </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  if (!bookedDetails) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="mx-2">
        <Modal.Title className="fw-bold">Bus Ticket Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body className="justify-content-center align-items-center mx-4">
        <div className="ticket-receipt mx-auto px-4" ref={receiptRef}>
          <h4 className="title d-none d-print-block d-download-block">
            🚌 Bus Ticket Receipt
          </h4>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Passenger:</strong>
              <div>
                {bookedDetails.firstName} {bookedDetails.lastName}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Email:</strong>
              <div>{bookedDetails.email}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Mobile:</strong>
              <div>{bookedDetails.mobileNumber}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Date of Birth:</strong>
              <div>
                {new Date(bookedDetails.dateOfBirth).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Bus Name:</strong>
              <div>{busDetails?.bus_name || "N/A"}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Departure:</strong>
              <div>{busDetails?.departure_time || "N/A"}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>From City:</strong>
              <div>{busDetails?.from_city_name || "N/A"}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>To City:</strong>
              <div>{busDetails.to_city_name || "N/A"}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Journey Date:</strong>
              <div>{formatDateMain(busDetails?.journey_date)}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Seat Number:</strong>
              <div>{seatNumber || "N/A"}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Coupon:</strong>
              <div>{bookedDetails.coupon || "N/A"}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Discount:</strong>
              <div>₹ {bookedDetails.couponDiscount || 0}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12 col-md-6">
              <strong>Total Paid:</strong>
              <div>₹ {bookedDetails.totalPrice}</div>
            </div>
            <div className="col-12 col-md-6">
              <strong>Booking Time:</strong>
              <div>{formatDate(new Date())}</div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-12">
              <strong>Address:</strong>
              <div>{bookedDetails.presentAddressLine1}</div>
            </div>
          </div>

          <div className="footer d-none d-print-block">
            This ticket is electronically generated and valid without signature.
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="w-100">
        <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2 w-100">
          <Button
            className="w-100 w-md-auto"
            variant="primary"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
          <Button
            className="w-100 w-md-auto"
            variant="secondary"
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            className="w-100 w-md-auto"
            variant="danger"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketReceipt;
