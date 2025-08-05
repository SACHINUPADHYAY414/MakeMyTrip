import { useState, useEffect } from "react";
import { Table, Container, Row, Col, Spinner } from "react-bootstrap";
import TicketReceipt from "../../Components/TicketReceipt/TicketReceipt";
import { ImEye, ImFolderDownload } from "react-icons/im";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from "../../Action/Api";
import { formatDateMain } from "../../Utils/timeFormater";

const AllTickets = () => {
  const [ticketsData, setTicketsData] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const user = useSelector((state) => state.login?.login_data?.user);

  useEffect(() => {
    if (!user?.id) return;
    const fetchTickets = async () => {
      try {
        const response = await api.get(`busBookingByUser/${user.id}`);

        setTicketsData(response.data);
        console.log("response.data", response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, [user?.id]);

  const handleView = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleDownload = (ticket) => {
    setSelectedTicket(ticket);
    setIsDownload(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTicket(null);
    setIsDownload(false);
  };

  return (
    <>
      <Container className="mt-4">
        {/* {JSON.stringify(ticketsData)} */}
        <Row>
          <Col>
            <h3 className="mb-4 text-start fw-semibold">All Tickets</h3>
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                responsive
                className="text-truncate text-nowrap "
              >
                <thead className="table-primary text-center">
                  <tr>
                    <th>S.No</th>
                    <th>Bus Name</th>
                    <th>Journey Date</th>
                    <th>From City</th>
                    <th>To City</th>
                    <th>Price (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {ticketsData.map((ticket, index) => (
                    <tr key={ticket.id}>
                      <td>{index + 1}</td>
                      <td>{ticket.bus_name}</td>
                      <td>{formatDateMain(ticket.journey_date)}</td>
                      <td>{ticket.from_city_name}</td>
                      <td>{ticket.to_city_name}</td>
                      <td>₹{ticket.totalprice}</td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-view-${ticket.id}`}>
                                View Ticket
                              </Tooltip>
                            }
                          >
                            <span
                              style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            >
                              <ImEye
                                className="text-info"
                                onClick={() => handleView(ticket)}
                              />
                            </span>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-download-${ticket.id}`}>
                                Download Ticket
                              </Tooltip>
                            }
                          >
                            <span
                              style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            >
                              <ImFolderDownload
                                className="text-success"
                                onClick={() => handleDownload(ticket)}
                              />
                            </span>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      <TicketReceipt
        show={showModal}
        setShow={setShowModal}
        handleClose={handleClose}
        bookedDetails={selectedTicket}
        isDownload={isDownload}
        setIsDownload={setIsDownload}
        ticketsData={ticketsData}
      />
    </>
  );
};

export default AllTickets;
