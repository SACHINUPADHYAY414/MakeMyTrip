import React, { useState, useEffect } from "react";
import api from "../../Action/Api";
import { useToastr } from "../Toastr/ToastrProvider";
import TooltipWrapper from "../Tooltip/TooltipWrapper";
import { RiInformation2Line } from "react-icons/ri";
import {
  OPPS_MSG,
  SUCCESS_MSG,
  ERROR_REQUIRED,
  ERROR_VALIDATE_EMAIL,
  ERROR_MAXIMUM_LENGTH,
  ERROR_MINIMUM_LENGTH,
  ERROR_LEADING_OR_TRAILING_SPACE,
  ERROR_DOUBLE_SPACE,
  DOB_RANGE_MESSAGE,
  ERROR_PASTE_DATA,
  ERROR_MUST_LENGTH
} from "../../Utils/strings.js";

import CustomInputField from "../CustomInput/CustomInputField";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  sanitizeInput,
  validatePersonName,
  verifyEmail,
  validateLength,
  validateDateOfBirthField,
  verifyStartingOrEndingCharacters,
  verifyDoubleSpace,
  sanitizeEmail,
  sanitizeMobileNumber,
  sanitizeZipCode,
  sanitizeAddress,
  verifyPasteData,
  allowOnlyNumbersFilter,
  start_with_char,
  start_with_char_or_number
} from "../../Utils/allValidation.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { customToast } = useToastr();
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    presentAddressLine1: "",
    presentPincode: "",
    presentCountry: "1",
    presentState: "",
    presentCity: "",
    email: "",
    mobileNumber: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const titleList = [
    { id: "1", name: "Mr." },
    { id: "2", name: "Mrs." },
    { id: "3", name: "Ms." }
  ];
  const genderList = [
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" }
  ];
  const countryList = [
    { id: "1", name: "India" },
    { id: "2", name: "United States" },
    { id: "3", name: "Canada" },
    { id: "4", name: "Australia" }
  ];

  const stateList = [
    { id: "101", name: "Maharashtra", countryId: "1" },
    { id: "102", name: "Delhi", countryId: "1" },
    { id: "103", name: "Karnataka", countryId: "1" },
    { id: "104", name: "Tamil Nadu", countryId: "1" },
    { id: "105", name: "Uttar Pradesh", countryId: "1" },

    // United States
    { id: "201", name: "California", countryId: "2" },
    { id: "202", name: "Texas", countryId: "2" },
    { id: "203", name: "New York", countryId: "2" },
    { id: "204", name: "Florida", countryId: "2" },
    { id: "205", name: "Illinois", countryId: "2" },

    // Canada
    { id: "301", name: "Ontario", countryId: "3" },
    { id: "302", name: "British Columbia", countryId: "3" },
    { id: "303", name: "Quebec", countryId: "3" },
    { id: "304", name: "Alberta", countryId: "3" },
    { id: "305", name: "Manitoba", countryId: "3" },

    // Australia
    { id: "401", name: "New South Wales", countryId: "4" },
    { id: "402", name: "Victoria", countryId: "4" },
    { id: "403", name: "Queensland", countryId: "4" },
    { id: "404", name: "Western Australia", countryId: "4" },
    { id: "405", name: "South Australia", countryId: "4" }
  ];
  const cityList = [
    // 🇮🇳 India
    { id: "1001", name: "Mumbai", stateId: "101" },
    { id: "1002", name: "Pune", stateId: "101" },
    { id: "1003", name: "New Delhi", stateId: "102" },
    { id: "1004", name: "Dwarka", stateId: "102" },
    { id: "1005", name: "Bengaluru", stateId: "103" },
    { id: "1006", name: "Mysuru", stateId: "103" },
    { id: "1007", name: "Chennai", stateId: "104" },
    { id: "1008", name: "Coimbatore", stateId: "104" },
    { id: "1009", name: "Lucknow", stateId: "105" },
    { id: "1010", name: "Varanasi", stateId: "105" },

    // 🇺🇸 United States
    { id: "2001", name: "Los Angeles", stateId: "201" },
    { id: "2002", name: "San Francisco", stateId: "201" },
    { id: "2003", name: "Houston", stateId: "202" },
    { id: "2004", name: "Dallas", stateId: "202" },
    { id: "2005", name: "New York City", stateId: "203" },
    { id: "2006", name: "Buffalo", stateId: "203" },
    { id: "2007", name: "Miami", stateId: "204" },
    { id: "2008", name: "Orlando", stateId: "204" },
    { id: "2009", name: "Chicago", stateId: "205" },
    { id: "2010", name: "Springfield", stateId: "205" },

    // 🇨🇦 Canada
    { id: "3001", name: "Toronto", stateId: "301" },
    { id: "3002", name: "Ottawa", stateId: "301" },
    { id: "3003", name: "Vancouver", stateId: "302" },
    { id: "3004", name: "Victoria", stateId: "302" },
    { id: "3005", name: "Montreal", stateId: "303" },
    { id: "3006", name: "Quebec City", stateId: "303" },
    { id: "3007", name: "Calgary", stateId: "304" },
    { id: "3008", name: "Edmonton", stateId: "304" },
    { id: "3009", name: "Winnipeg", stateId: "305" },
    { id: "3010", name: "Brandon", stateId: "305" },

    // 🇦🇺 Australia
    { id: "4001", name: "Sydney", stateId: "401" },
    { id: "4002", name: "Newcastle", stateId: "401" },
    { id: "4003", name: "Melbourne", stateId: "402" },
    { id: "4004", name: "Geelong", stateId: "402" },
    { id: "4005", name: "Brisbane", stateId: "403" },
    { id: "4006", name: "Gold Coast", stateId: "403" },
    { id: "4007", name: "Perth", stateId: "404" },
    { id: "4008", name: "Fremantle", stateId: "404" },
    { id: "4009", name: "Adelaide", stateId: "405" },
    { id: "4010", name: "Mount Gambier", stateId: "405" }
  ];

  const formFields = [
    {
      label: "Title",
      id: "title",
      name: "title",
      value: formData.title,
      type: "select",
      options: titleList,
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Gender",
      id: "gender",
      name: "gender",
      value: formData.gender,
      type: "select",
      options: genderList,
      colClass: "col-12 col-md-4",
      required: true
    },
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
    },
    {
      label: "Pincode",
      id: "presentPincode",
      name: "presentPincode",
      value: formData.presentPincode,
      type: "tel",
      placeholder: "Pincode",
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Country",
      id: "presentCountry",
      name: "presentCountry",
      value: formData.presentCountry,
      type: "select",
      options: countryList,
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "State",
      id: "presentState",
      name: "presentState",
      value: formData.presentState,
      type: "select",
      options: stateList,
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "City",
      id: "presentCity",
      name: "presentCity",
      value: formData.presentCity,
      type: "select",
      options: cityList,
      colClass: "col-12 col-md-4",
      required: true
    },
    {
      label: "Password",
      id: "password",
      name: "password",
      placeholder: "Enter strong password",
      type: "password",
      colClass: "col-12 col-md-4",
      required: true
    }
  ];
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (formData.presentCountry) {
      const matchedStates = stateList.filter(
        (state) => state.countryId === formData.presentCountry
      );
      setFilteredStates(matchedStates);
      setFormData((prev) => ({ ...prev, presentState: "", presentCity: "" }));
      setFilteredCities([]);
    }
  }, [formData.presentCountry]);

  useEffect(() => {
    if (formData.presentState) {
      const matchedCities = cityList.filter(
        (city) => city.stateId === formData.presentState
      );
      setFilteredCities(matchedCities);
      setFormData((prev) => ({ ...prev, presentCity: "" }));
    }
  }, [formData.presentState]);

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

      case "presentPincode":
        updatedValue = sanitizeZipCode(value, 6);
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

      default:
        updatedValue = sanitizedValue;
        break;
    }

    const specialCharRegex =
      name === "dateOfBirth" ||
      name === "presentPincode" ||
      name === "mobileNumber"
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

    if (name === "title" && sanitizedValue !== "") {
      setFormData((prevData) => ({
        ...prevData,
        gender:
          sanitizedValue === "1"
            ? "1"
            : sanitizedValue === "2" || sanitizedValue === "3"
            ? "2"
            : ""
      }));
    }

    return;
  };

  const onPaste = (e, required, label) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.clipboardData.getData("Text");

    const result = verifyPasteData(value);

    if (!result.valid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ERROR_PASTE_DATA
      }));
      return;
    }

    handleChange(e, required, label, value);
  };

  const formHandlers = {
    handleChange
  };

  const handleOnBlur = (e, required, label) => {
    let { name, value } = e.target;
    let error = "";
    let updatedValue = value;

    if (value) {
      if (
        (name === "presentAddressLine1" ||
          name === "firstName" ||
          name === "lastName") &&
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
        case "presentPincode":
          if (!validateLength(value, 6, 6)) {
            error = ERROR_MUST_LENGTH(6);
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

  useEffect(() => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      Object.keys(formFields).forEach((key) => {
        const field = formFields[key];
        if (field.type === "select") {
          if (
            formData?.[field.name] !== "" &&
            formData?.[field.name] !== null
          ) {
            updatedErrors[field.name] = "";
          }
        }
      });

      return updatedErrors;
    });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    formFields.forEach((field) => {
      const { name, label, required } = field;
      const value = formData[name];

      console.log(`Field: ${name}, Required: ${required}, Value:`, value);

      if (
        required &&
        (value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === ""))
      ) {
        tempErrors[name] = ERROR_REQUIRED(label);
      }
    });
    console.log("tempErrors:", tempErrors);

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: "Please fill all required fields correctly.",
        life: 3000,
        sticky: false,
        closable: true
      });
      return;
    }
    const mapToBackendKeys = (data) => ({
      title: data.title,
      first_name: data.firstName,
      last_name: data.lastName,
      gender: data.gender,
      date_of_birth: data.dateOfBirth,
      present_address_line1: data.presentAddressLine1,
      present_pincode: data.presentPincode,
      present_country: data.presentCountry,
      present_state: data.presentState,
      present_city: data.presentCity,
      email: data.email,
      password: data.password
    });

    try {
      // await api.post("/register", formData);
      await api.post("/register", mapToBackendKeys(formData));

      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Registration successful. Please login.",
        life: 3000,
        sticky: false,
        closable: true
      });

      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        presentAddressLine1: "",
        presentPincode: "",
        presentCountry: "3",
        presentState: "",
        presentCity: "",
        email: "",
        password: ""
      });
      setErrors({});
      navigate("/login");
    } catch (err) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: err.response?.data?.message || "Registration failed.",
        life: 3000,
        sticky: false,
        closable: true
      });
    }
  };

  function returnControls(field) {
    const colClass = field.colClass || "col-12 col-md-4";
    const fieldError = errors?.[field.name];
    const fieldValue = formData?.[field.name] ?? "";
    const hasError = !!fieldError;
    const errorMessage = fieldError || "";

    if (field.type === "select") {
      const options =
        field.name === "title"
          ? titleList
          : field.name === "gender"
          ? genderList
          : field.name === "presentCountry"
          ? countryList
          : field.name === "presentState"
          ? filteredStates
          : field.name === "presentCity"
          ? filteredCities
          : [];

      return (
        <div
          className={colClass}
          key={field.id}
          style={{ position: "relative" }}
        >
          <label
            htmlFor={field.id}
            className="form-label fw-medium required-label"
          >
            {field.label}
          </label>

          <select
            id={field.id}
            name={field.name}
            value={fieldValue}
            onChange={(e) =>
              formHandlers.handleChange(e, field.required, field.label)
            }
            onBlur={(e) => handleOnBlur(e, field.required, field.label)}
            className={`form-select ${
              hasError ? "hasError" : fieldValue ? "is-valid" : ""
            }`}
          >
            <option value="" disabled>
              Select
            </option>
            {options.map((data, index) => (
              <option key={data.id || index} value={data.id || data[0]}>
                {data.name || data[1]}
              </option>
            ))}
          </select>

          {hasError && (
            <TooltipWrapper tooltipMessage={errorMessage}>
              <span
                style={{
                  position: "absolute",
                  right: "2.7rem",
                  top: "50%",
                  transform: "translateY(10%)",
                  cursor: "pointer"
                }}
              >
                <RiInformation2Line color="#ff3d42" />
              </span>
            </TooltipWrapper>
          )}
        </div>
      );
    }

    if (
      ["text", "tel", "email", "url", "number", "date", "password"].includes(
        field.type
      )
    ) {
      return (
        <CustomInputField
          key={field.id}
          field={field}
          colClass={colClass}
          errors={errors}
          formData={formData}
          formHandlers={formHandlers}
          allowOnlyNumbersFilter={allowOnlyNumbersFilter}
          onPaste={(e) => onPaste(e, field.required, field.label)}
          value={fieldValue}
          onInput={(e) => {
            if (e.target?.type === "number") {
              const value = e.target.value;
              e.target.value = allowOnlyNumbersFilter(value);
            }
          }}
          onBlur={(e) => handleOnBlur(e, field.required, field.label)}
          error={errorMessage}
          onChange={(e) =>
            formHandlers.handleChange(e, field.required, field.label)
          }
        />
      );
    }

    return null;
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div
        className="container d-flex justify-content-center align-items-center my-3"
        style={{ minHeight: "87vh" }}
      >
        <div className="card shadow p-4 w-100" style={{ maxWidth: "700px" }}>
          <h3 className="text-center mb-4 fw-bold">Register</h3>

          <div className="row g-2">{formFields.map(returnControls)}</div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Register;
