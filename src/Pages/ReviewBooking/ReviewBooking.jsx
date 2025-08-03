import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup
} from "react-bootstrap";
import { BsBusFront, BsTruck } from "react-icons/bs";
import BreadcrumbNav from "../../Components/Breadcrumb/Breadcrumb";
import {
  formatDateMain,
  formatTimeToAMPM,
  timeTaken
} from "../../Utils/timeFormater";
import { useSelector } from "react-redux";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import {
  DOB_RANGE_MESSAGE,
  ERROR_DOUBLE_SPACE,
  ERROR_LEADING_OR_TRAILING_SPACE,
  ERROR_MAXIMUM_LENGTH,
  ERROR_MINIMUM_LENGTH,
  ERROR_MUST_LENGTH,
  ERROR_REQUIRED,
  ERROR_VALIDATE_EMAIL,
  OPPS_MSG,
  SERVER_ERROR,
  SUCCESS_MSG
} from "../../Utils/strings";
import api from "../../Action/Api";
import CustomInputField from "../../Components/CustomInput/CustomInputField";
import {
  sanitizeAddress,
  sanitizeEmail,
  sanitizeInput,
  sanitizeMobileNumber,
  start_with_char,
  start_with_char_or_number,
  validateDateOfBirthField,
  validateLength,
  validatePersonName,
  verifyDoubleSpace,
  verifyEmail,
  verifyStartingOrEndingCharacters
} from "../../Utils/allValidation";
import { FaIdCard } from "react-icons/fa";
import TicketReceipt from "../../Components/TicketReceipt/TicketReceipt";
import { useNavigate } from "react-router-dom";

const BusBookingReview = () => {
  const { customToast } = useToastr();
  const { busId, seatId, busDetails } = useSelector((state) => state.booking);
  const navigate = useNavigate();
  const baseFare = 40;
  const gst = 50;
  const busPrice = busDetails?.price ?? 0;
  const totalPrice = parseFloat(busPrice) + baseFare + gst;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    presentAddressLine1: "",
    email: "",
    mobileNumber: "",
    coupon: ""
  });

  const [errors, setErrors] = useState({});
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  const formFields = [
    {
      label: "First Name",
      id: "firstName",
      name: "firstName",
      value: formData.firstName,
      type: "text",
      placeholder: "First Name",
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Last Name",
      id: "lastName",
      name: "lastName",
      value: formData.lastName,
      type: "text",
      placeholder: "Last Name",
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Date of Birth",
      id: "dateOfBirth",
      name: "dateOfBirth",
      value: formData.dateOfBirth,
      type: "date",
      placeholder: "Date of Birth",
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Email",
      id: "email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Mobile No",
      id: "mobileNumber",
      name: "mobileNumber",
      placeholder: "Enter your mobile no",
      type: "tel",
      colClass: "col-12 col-md-4",
      required: true
    },

    {
      label: "Address",
      id: "presentAddressLine1",
      name: "presentAddressLine1",
      value: formData.presentAddressLine1,
      type: "text",
      placeholder: "Present Address",
      colClass: "col-12 col-md-4",
      required: true
    }
  ];

  const couponField = {
    id: "coupon",
    name: "coupon",
    type: "text",
    placeholder: "Enter Coupon Code",
    // label: "Coupon Code",
    required: false,
    colClass: "w-100"
  };

  const coupons = [
    {
      code: "EMTAZADI",
      discount: 250,
      description: "Use this coupon and get up to Rs.250 OFF (Bank of Baroda)",
      badgeProps: { bg: "secondary" }
    },
    {
      code: "DELIGHT",
      discount: 400,
      description: "Win a flight, hotel stay, and voucher worth Rs.4000",
      badgeProps: { bg: "secondary" }
    }
  ];

  const handleChange = (e, required = false, label = "", pastedValue = "") => {
    let { name, value } = e.target;

    if (pastedValue) {
      value = value + pastedValue;
    }

    let sanitizedValue = sanitizeInput(value);
    let updatedValue;
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        updatedValue = validatePersonName(sanitizedValue);
        if (updatedValue.length > 30) {
          error = ERROR_MAXIMUM_LENGTH(30);
        }
        break;

      case "presentAddressLine1":
        updatedValue = sanitizeAddress(sanitizedValue);
        if (updatedValue.length > 250) {
          error = ERROR_MAXIMUM_LENGTH(250);
        }
        break;

      case "mobileNumber":
        updatedValue = sanitizeMobileNumber(sanitizedValue);
        break;

      case "email":
        updatedValue = sanitizeEmail(sanitizedValue);
        break;

      case "dateOfBirth":
        updatedValue = sanitizedValue;
        if (sanitizedValue && !validateDateOfBirthField(sanitizedValue)) {
          error = DOB_RANGE_MESSAGE;
        }
        break;

      case "coupon":
        updatedValue = sanitizeAddress(sanitizedValue);
        if (name === "coupon") {
          updatedValue = sanitizeAddress(sanitizedValue).toUpperCase();

          const matchingCoupon = coupons.find((c) => c.code === updatedValue);

          if (matchingCoupon) {
            setCouponDiscount(matchingCoupon.discount);
          } else {
            setCouponDiscount(0);
          }
        }

        break;
      default:
        updatedValue = sanitizedValue;
        break;
    }
    const specialCharRegex =
      name === "dateOfBirth" || name === "mobileNumber"
        ? start_with_char_or_number
        : start_with_char;

    if (!updatedValue && required) {
      error = ERROR_REQUIRED(label);
    }
    if (specialCharRegex.test(value)) {
      error = ERROR_LEADING_OR_TRAILING_SPACE;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleOnBlur = (e, required, label) => {
    let { name, value } = e.target;
    let error = "";
    let updatedValue = value;

    if (value) {
      if (
        (name === "presentAddressLine1" ||
          name === "firstName" ||
          name === "lastName" ||
          name === "coupon") &&
        !verifyStartingOrEndingCharacters(value)
      ) {
        error = ERROR_LEADING_OR_TRAILING_SPACE;
      } else if (verifyDoubleSpace(value)) {
        error = ERROR_DOUBLE_SPACE;
      }

      switch (name) {
        case "firstName":
        case "lastName":
          if (!validateLength(value, 2, 30)) {
            error =
              value.length < 2
                ? ERROR_MINIMUM_LENGTH(2)
                : ERROR_MAXIMUM_LENGTH(30);
          }
          break;
        case "presentAddressLine1":
          if (!validateLength(value, 3, 250)) {
            error =
              value.length < 3
                ? ERROR_MINIMUM_LENGTH(3)
                : ERROR_MAXIMUM_LENGTH(250);
          }
          break;
        case "mobileNumber":
          if (!validateLength(value, 10, 10)) {
            error = ERROR_MUST_LENGTH(10);
          }
          break;
        case "email":
          if (!verifyEmail(value)) {
            error = ERROR_VALIDATE_EMAIL;
          }
          break;
        case "coupon":
          if (!validateLength(value, 3, 10)) {
            error =
              value.length < 3
                ? ERROR_MINIMUM_LENGTH(3)
                : ERROR_MAXIMUM_LENGTH(10);
          }
          break;
        default:
          break;
      }
    }

    if (!value && required) {
      error = ERROR_REQUIRED(label);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: "Invalid coupon code",
        life: 3000
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      coupon: coupon.code
    }));
    setCouponDiscount(coupon.discount);

    customToast({
      severity: "success",
      summary: SUCCESS_MSG,
      detail: `Coupon ${coupon.code} applied. You saved ₹${coupon.discount}`,
      life: 3000
    });
  };

  const validateForm = () => {
    let newErrors = {};
    formFields.forEach(({ name, required, label }) => {
      if (required && !formData[name]?.toString().trim()) {
        newErrors[name] = `${label} is required`;
      }
      if (errors[name]) {
        newErrors[name] = errors[name];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!validateForm()) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: "Please fill all required fields correctly.",
        life: 3000
      });
      return;
    }

    const payload = {
      busId,
      seatId,
      ...formData,
      couponDiscount,
      totalPrice: Number(totalPrice.toFixed(0))
    };
    setBookedDetails(payload);
    try {
      const response = await api.post("/busBooking", payload);
      if (!response || response.error) {
        throw new Error(response?.error || "Failed to submit booking");
      }

      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Your ticket will be sent to this email address.",
        life: 3000
      });

      setShowTicketModal(true);
          const ticketData = {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      busName: busDetails?.bus_name || "",
      journeyDate: payload.journey_date,
      seatNumber: payload.seat_number,
    };

    // Only send email if email exists
    if (ticketData.email) {
      await sendTicketEmail(ticketData);
    }

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setShowTicketModal(false);
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: error.message || SERVER_ERROR,
        life: 3000
      });
    }
  };

const sendTicketEmail = async (ticketData) => {
  try {
    const response = await api.post("/send-ticket", ticketData);
    alert(response.data.message);
  } catch (error) {
    console.error("Email send error:", error);
    alert("Failed to send email.");
  }
};

  bookedDetails;
  if (!busId || !seatId) {
    return <div>No booking data. Please select a bus again.</div>;
  }

  return (
    <Container className="py-4">
      <BreadcrumbNav extra={[{ name: "Payment" }]} />
      <Row className="mt-3">
        <Col md={8}>
          {/* Bus Details */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-info text-white fw-bold">
              Bus Details
            </Card.Header>
            <Card.Body>
              <Row className="mb-3 g-3 align-items-center">
                <Col md={6}>
                  <div className="d-flex align-items-start gap-3">
                    <BsBusFront size={30} className="text-warning" />
                    <div>
                      <h5 className="mb-1 fw-semibold">
                        {busDetails?.bus_name || "Bus Name"}
                      </h5>
                      <div className="text-muted small">
                        {formatDateMain(busDetails?.journey_date)}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="text-center text-md-end">
                  <h5 className="fw-semibold w-100">
                    {busDetails?.from_city_name || "From City"} →{" "}
                    {busDetails?.to_city_name || "To City"}
                  </h5>
                </Col>
              </Row>

              {/* Label Row (visible only on desktop) */}
              <Row className="d-none d-md-flex text-center fw-bold">
                <Col md={3}>Departure</Col>
                <Col md={2}>Duration</Col>
                <Col md={3}>Arrival</Col>
                <Col md={2}>Seat no(s)</Col>
                <Col md={2}>Passengers</Col>
              </Row>

              {/* Value Row - mobile shows label & value in same row, desktop just shows values */}
              <Row className="text-start text-md-center g-2">
                {/* Departure */}
                <Col xs={12} md={3}>
                  <div className="d-flex d-md-none justify-content-between">
                    <strong>Departure</strong>
                    <span>{formatTimeToAMPM(busDetails?.departure_time)}</span>
                  </div>
                  <div className="d-none d-md-block">
                    {formatTimeToAMPM(busDetails?.departure_time)}
                  </div>
                </Col>

                {/* Duration */}
                <Col xs={12} md={2}>
                  <div className="d-flex d-md-none justify-content-between">
                    <strong>Duration</strong>
                    <span>
                      {timeTaken(
                        busDetails?.departure_time,
                        busDetails?.arrival_time
                      )}
                    </span>
                  </div>
                  <div className="d-none d-md-block">
                    {timeTaken(
                      busDetails?.departure_time,
                      busDetails?.arrival_time
                    )}
                    <BsTruck className="ms-1" />
                  </div>
                </Col>

                {/* Arrival */}
                <Col xs={12} md={3}>
                  <div className="d-flex d-md-none justify-content-between">
                    <strong>Arrival</strong>
                    <span>{formatTimeToAMPM(busDetails?.arrival_time)}</span>
                  </div>
                  <div className="d-none d-md-block">
                    {formatTimeToAMPM(busDetails?.arrival_time)}
                  </div>
                </Col>

                {/* Seat No(s) */}
                <Col xs={12} md={2}>
                  <div className="d-flex d-md-none justify-content-between">
                    <strong>Seat no(s)</strong>
                    <span>{seatId || "N/A"}</span>
                  </div>
                  <div className="d-none d-md-block">{seatId || "N/A"}</div>
                </Col>

                {/* Passengers */}
                <Col xs={12} md={2}>
                  <div className="d-flex d-md-none justify-content-between">
                    <strong>Passengers</strong>
                    <span>1</span>
                  </div>
                  <div className="d-none d-md-block">1</div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Badge bg="secondary">Bus Operator</Badge>
                  <p className="fw-bold mt-1">
                    IntrCity SmartBus (Washroom onboard)
                    <br />
                    2+1(34) AC, Sleeper with Washroom, Volvo Eicher
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* User Details Form */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-info text-white fw-bold">
              <div>Traveller Details</div>
              <span
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "8px",
                  marginBottom: "0"
                }}
              >
                <FaIdCard
                  className="d-none d-md-inline"
                  style={{ width: "20px", height: "20px", color: "black" }}
                />
                Name should be same as in Government ID proof
              </span>
            </Card.Header>

            <Card.Body>
              <Form>
                <Row>
                  {formFields.map((field) => {
                    const colSize = field.colClass.replace(
                      "col-12 col-md-3",
                      ""
                    );
                    return (
                      <CustomInputField
                        key={field.id}
                        type={field.type}
                        id={field.id}
                        field={field}
                        colClass={colSize}
                        value={formData[field.name]}
                        placeholder={field.placeholder}
                        onChange={(e) =>
                          handleChange(e, field.required, field.label)
                        }
                        onBlur={(e) =>
                          handleOnBlur(e, field.required, field.label)
                        }
                        required={field.required}
                        error={errors[field.name]}
                      />
                    );
                  })}
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Offers & Promo Code */}
          <Card className="mb-3">
            <Card.Header className="bg-info text-white fw-bold d-flex justify-content-between">
              <span>Offers & Promo Code</span>
              <span role="img" aria-label="offer">
                🎁
              </span>
            </Card.Header>
            <Card.Body>
              <div>
                <CustomInputField
                  type="text"
                  field={couponField}
                  value={formData.coupon}
                  onChange={(e) =>
                    handleChange(e, couponField.required, couponField.label)
                  }
                  onBlur={(e) =>
                    handleOnBlur(e, couponField.required, couponField.label)
                  }
                  required={couponField.required}
                  error={errors[couponField.name]}
                  colClass={couponField.colClass}
                  hideLabel={true}
                />
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className={`p-2 mt-2 border rounded ${
                      formData.coupon === coupon.code
                        ? "border-info"
                        : "bg-light"
                    }`}
                  >
                    <Form.Check
                      type="radio"
                      id={`coupon-${coupon.code}`}
                      name="couponRadio"
                      value={coupon.code}
                      label={
                        <>
                          <Badge
                            bg={coupon.badgeProps.bg}
                            text={coupon.badgeProps.text || ""}
                            className="me-2"
                          >
                            {coupon.code}
                          </Badge>
                          {coupon.description}
                        </>
                      }
                      checked={formData.coupon === coupon.code}
                      onChange={() => applyCoupon(coupon.code)}
                    />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Price Summary */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-info text-white fw-bold">
              Price Summary
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>Onward Fare</Col>
                <Col className="text-end">
                  ₹{parseFloat(busPrice).toFixed(0)}
                </Col>
              </Row>
              <Row>
                <Col>Base Fare</Col>
                <Col className="text-end">₹{baseFare}</Col>
              </Row>
              <Row>
                <Col>GST</Col>
                <Col className="text-end">₹{gst}</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <strong>Grand Total</strong>
                </Col>
                <Col className="text-end text-danger fw-bold">
                  ₹{totalPrice.toFixed(0)}
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="info"
                  className="text-light"
                  onClick={handleSubmit}
                  type="button"
                >
                  Confirm Booking & Pay
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <TicketReceipt
        show={showTicketModal}
        setShow={setShowTicketModal}
        bookedDetails={bookedDetails}
      />
    </Container>
  );
};

export default BusBookingReview;
