import React, { useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import { formatDateMain, formatTimeToAMPM } from "../../Utils/timeFormater";

const TicketContent = ({
  bookedDetails,
  seatNumber,
  hideHeader,
  ticketsData,
  busDetails
}) => {
  const getValue = (keys) => {
    for (let key of keys) {
      // For other keys, fallback normally
      if (bookedDetails?.[key]) return bookedDetails[key];
      if (ticketsData?.[key]) return ticketsData[key];
      if (busDetails?.[key]) return busDetails[key];
    }
    return "N/A";
  };
  const seatNum = seatNumber || getValue(["seat_number", "seatNumber"]);

  return (
    <>
      {!hideHeader && (
        <div className="print-header d-none d-md-block">
          YatraVilla Ticket Receipt
        </div>
      )}
      <div className="ticket-receipt  mx-auto px-4 justify-content-center align-items-center mx-4">
        <div className="row">
          <div className="col-12 col-3">
            <strong>Passenger:</strong>
          </div>
          <div className="col-3">
            {getValue(["firstname", "firstName"])}{" "}
            {getValue(["lastname", "lastName"])}
          </div>

          <div className="col-3">
            <strong>Email:</strong>
          </div>
          <div className="col-3">{getValue(["email", "email"])}</div>
        </div>

        <div className="row">
          <div className="col-3">
            <strong>Mobile:</strong>
          </div>
          <div className="col-3">
            {getValue(["mobilenumber", "mobileNumber"])}
          </div>
          <div className="col-3">
            <strong>Date of Birth:</strong>
          </div>
          <div className="col-3">
            {formatDateMain(getValue(["dateofbirth", "dateOfBirth"]))}
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <strong>Address:</strong>
          </div>
          <div className="col-3">
            {getValue(["presentaddressline1", "presentAddressLine1"])}
          </div>
          <div className="col-3">
            <strong>Bus Name:</strong>
          </div>
          <div className="col-3">
            {getValue(["bus_name"]) || busDetails?.bus_name}
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <strong>From City:</strong>
          </div>
          <div className="col-3">
            {getValue(["from_city_name", "fromCity"])}
          </div>
          <div className="col-3">
            <strong>To City:</strong>
          </div>
          <div className="col-3">{getValue(["to_city_name", "toCity"])}</div>
        </div>

        <div className="row">
          <div className="col-3">
            <strong>Journey Date :</strong>
          </div>
          <div className="col-3">
            {formatDateMain(getValue(["journey_date", "journeyDate"]))}
          </div>

          <div className="col-3">
            <strong>Departure:</strong>
          </div>
          <div className="col-3">
            {formatTimeToAMPM(getValue(["departuretime", "departure_time"]))}
          </div>
          <div className="col-3">
            <strong>Arrival:</strong>
          </div>
          <div className="col-3">
            {formatTimeToAMPM(getValue(["arrivaltime", "arrival_time"]))}
          </div>
          <div className="col-3">
            <strong>Seat No :</strong>
          </div>
          <div className="col-3">
            {Array.isArray(seatNum) ? seatNum.join(", ") : seatNum || "NA"}
          </div>
          <div className="col-3">
            <strong>Price :</strong>
          </div>
          <div className="col-3">₹{getValue(["totalprice", "totalPrice"])}</div>
        </div>
      </div>

      <div className="print-footer">
        This ticket is electronically generated and valid without signature.
      </div>
    </>
  );
};

const TicketReceipt = ({
  show,
  setShow,
  bookedDetails,
  seatNumber,
  isDownload,
  setIsDownload
}) => {
  const receiptRef = useRef(null);
  const { busDetails } = useSelector((state) => state.booking);

  const handleClose = () => setShow(false);

  const handlePrint = () => {
    const content = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
    <html>
      <head>
        <title>YatraVilla Ticket</title>
       <style>
          @media print {
            body {
              margin: 0;
              font-family: Arial, sans-serif;
              padding-top: 100px;
              padding-bottom: 60px;
            }

            .print-header, .print-footer {
              position: fixed;
              left: 0;
              right: 0;
              text-align: center;
              color: #007bff;
              font-weight: bold;
              z-index: 1000;
            }

            .print-header {
              top: 0;
              font-size: 22px;
              padding: 20px 0;
              border-bottom: 1px solid #ccc;
              background-color: #fff;
            }

            .print-footer {
              bottom: 0;
              font-size: 12px;
              font-style: italic;
              color: gray;
              padding: 10px 0;
              border-top: 1px solid #ccc;
              background-color: #fff;
            }

            .ticket-receipt {
              padding: 0 20px;
              page-break-inside: avoid;
            }

            .row {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 12px;
            }

            .col-3 {
              flex: 0 0 25%;
              max-width: 25%;
              box-sizing: border-box;
              padding: 0 8px;
              margin-bottom: 8px;
            }

            strong {
              color: #555;
              display: block;
              margin-bottom: 4px;
            }
          }

          /* For screen view before printing */
          body {
            font-family: Arial, sans-serif;
            color: #333;
          }

          .ticket-receipt {
            max-width: 100%;
            margin: auto;
            padding: 20px;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 12px;
          }

          .col-3 {
            flex: 0 0 25%;
            max-width: 25%;
            box-sizing: border-box;
            padding: 0 8px;
            margin-bottom: 8px;
          }

          strong {
            color: #555;
            display: block;
            margin-bottom: 4px;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  useEffect(() => {
    if (isDownload && bookedDetails) {
      const element = receiptRef.current;

      const opt = {
        margin: 0,
        filename: "YatraVilla-ticket-receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setIsDownload(false);
        });
    }
  }, [isDownload, bookedDetails, setIsDownload]);

  return (
    <>
      {/* Hidden content for download */}
      <div style={{ display: "none" }}>
        <div ref={receiptRef} className="pdf-content">
          <TicketContent
            bookedDetails={bookedDetails}
            seatNumber={seatNumber}
          />
        </div>
      </div>

      {/* Modal view */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Ticket Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TicketContent
            bookedDetails={bookedDetails}
            busDetails={busDetails}
            seatNumber={seatNumber}
            hideHeader={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>
        {`
          .print-header, .print-footer {
            text-align: center;
            font-weight: bold;
            color: #007bff;
            background-color: #fff;
          }

          .print-header {
            font-size: 22px;
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
          }

          .print-footer {
            font-size: 12px;
            font-style: italic;
            color: gray;
            padding: 10px 0;
            border-top: 1px solid #ccc;
            margin-top: 20px;
          }

          .ticket-receipt {
            padding: 20px;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 12px;
          }

          .col-3 {
            flex: 0 0 25%;
            max-width: 25%;
            padding: 0 8px;
          }

          strong {
            display: block;
            color: #555;
            margin-bottom: 4px;
          }

          @media print {
            .modal, .btn {
              display: none !important;
            }

            .ticket-receipt {
              padding: 100px 20px 60px 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default TicketReceipt;
