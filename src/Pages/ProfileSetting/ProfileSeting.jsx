import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RiInformation2Line } from "react-icons/ri";
import api from "../../Action/Api";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import TooltipWrapper from "../../Components/Tooltip/TooltipWrapper";
import CustomInputField from "../../Components/CustomInput/CustomInputField";
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
  ERROR_MUST_LENGTH,
  REQUIRED_FIELDS,
  SERVER_ERROR
} from "../../Utils/strings";
import {
  sanitizeInput,
  sanitizeAddress,
  sanitizeZipCode,
  sanitizeMobileNumber,
  sanitizeEmail,
  validateDateOfBirthField,
  validatePersonName,
  verifyPasteData,
  verifyStartingOrEndingCharacters,
  verifyDoubleSpace,
  validateLength,
  verifyEmail,
  start_with_char,
  start_with_char_or_number,
  allowOnlyNumbersFilter
} from "../../Utils/allValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_DATA } from "../../Redux/authSlice";

const ProfileSettings = () => {
  const loginData = useSelector((state) => state.login?.login_data);
  const userId = loginData?.user?.id;
  const dispatch = useDispatch();
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
    mobileNumber: ""
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
      required: true,
      readOnly: true
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
    }
  ];
  const filteredStates = stateList.filter(
    (state) => state.countryId === formData.presentCountry
  );
  const filteredCities = cityList.filter(
    (city) => city.stateId === formData.presentState
  );

  useEffect(() => {
    setFormData((prev) => ({ ...prev, presentState: "", presentCity: "" }));
  }, [formData.presentCountry]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // const userId = {userId};
        const resp = await api.get(`/profile/${userId}`);
        if (resp?.data?.data) {
          const data = resp.data.data;
          // console.log("data", data);
          setFormData({
            title: data.title || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            gender: data.gender || "",
            dateOfBirth: data.date_of_birth
              ? data.date_of_birth.split("T")[0]
              : "",
            presentAddressLine1: data.present_address_line1 || "",
            presentPincode: data.present_pincode || "",
            presentCountry: data.present_country || "1",
            presentState: data.present_state || "",
            presentCity: data.present_city || "",
            email: data.email || "",
            mobileNumber: data.mobile_number || ""
          });
        }
      } catch (error) {
        customToast({
          severity: "error",
          summary: OPPS_MSG,
          detail:
            error.response?.data?.message || error.message || SERVER_ERROR,
          life: 3000,
          sticky: false,
          closable: true
        });
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, presentCity: "" }));
  }, [formData.presentState]);

  const handleChange = (e, required, label = "", pastedValue = "") => {
    let { name, value } = e.target;
    if (pastedValue) value += pastedValue;
    let sanitizedValue = sanitizeInput(value);
    let updatedValue = sanitizedValue;
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        updatedValue = validatePersonName(sanitizedValue);
        if (updatedValue.length > 30) error = ERROR_MAXIMUM_LENGTH(30);
        break;
      case "presentAddressLine1":
        updatedValue = sanitizeAddress(sanitizedValue);
        if (updatedValue.length > 250) error = ERROR_MAXIMUM_LENGTH(250);
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
        if (sanitizedValue && !validateDateOfBirthField(sanitizedValue))
          error = DOB_RANGE_MESSAGE;
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

    if (!updatedValue && required) error = ERROR_REQUIRED(label);
    if (specialCharRegex.test(value)) error = ERROR_LEADING_OR_TRAILING_SPACE;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "title" && sanitizedValue !== "") {
      setFormData((prev) => ({
        ...prev,
        gender: sanitizedValue === "1" ? "1" : "2"
      }));
    }
  };

  const handleOnBlur = (e, required, label) => {
    const { name, value } = e.target;
    let error = "";
    if (value) {
      if (
        ["presentAddressLine1", "firstName", "lastName"].includes(name) &&
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
          if (!validateLength(value, 6, 6)) error = ERROR_MUST_LENGTH(6);
          break;
        case "mobileNumber":
          if (!validateLength(value, 10, 10)) error = ERROR_MUST_LENGTH(10);
          break;
        case "email":
          if (!verifyEmail(value)) error = ERROR_VALIDATE_EMAIL;
          break;
        default:
          break;
      }
    }
    if (!value && required) error = ERROR_REQUIRED(label);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const onPaste = (e, required, label) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.clipboardData.getData("Text");
    const result = verifyPasteData(value);
    if (!result.valid) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: ERROR_PASTE_DATA }));
      return;
    }
    handleChange(e, required, label, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: If existing errors already present, block submit
    const existingErrors = Object.values(errors).filter((msg) => msg);
    if (existingErrors.length > 0) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: "Please fix the highlighted errors before submitting.",
        life: 3000
      });
      return;
    }

    // Step 2: Check required fields
    const newErrors = {};
    formFields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && !value?.trim()) {
        newErrors[field.name] = ERROR_REQUIRED(field.label);
      }
    });

    // If any required field missing, block submit
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: "Please fill all required fields.",
        life: 3000
      });
      return;
    }

    // ✅ Safe to submit
    try {
      const payload = {
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        present_address_line1: formData.presentAddressLine1,
        present_pincode: formData.presentPincode,
        present_country: formData.presentCountry,
        present_state: formData.presentState,
        present_city: formData.presentCity,
        email: formData.email,
        mobile_number: formData.mobileNumber
      };
      const response = await api.put("/profile-setting", payload);
      const updatedUser = response.data?.user;
      console.log("updatedUser", updatedUser);
      dispatch({
        type: SET_LOGIN_DATA,
        payload: {
          token: loginData?.token,
          email: loginData?.email,
          user: updatedUser
        }
      });
      console.log("token after update", loginData?.token);

      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Profile update successful.",
        life: 3000
      });

      navigate("/");
    } catch (error) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: error.response?.data?.message || error.message || SERVER_ERROR,
        life: 3000
      });
    }
  };

  const formHandlers = { handleChange };

  const returnControls = (field) => {
    const colClass = field.colClass || "col-12 col-md-4";
    const fieldError = errors?.[field.name];
    const fieldValue = formData?.[field.name] ?? "";
    const hasError = !!fieldError;
    const errorMessage = fieldError || "";
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

    return field.type === "select" ? (
      <div className={colClass} key={field.id} style={{ position: "relative" }}>
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
          {options.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
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
    ) : (
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
        disabled={field.readOnly}
        onInput={(e) => {
          if (e.target?.type === "number") {
            e.target.value = allowOnlyNumbersFilter(e.target.value);
          }
        }}
        onBlur={(e) => handleOnBlur(e, field.required, field.label)}
        error={errorMessage}
        onChange={(e) =>
          formHandlers.handleChange(e, field.required, field.label)
        }
      />
    );
  };

  return (
    <>
      <div className="d-block d-md-none bg-light min-vh-100 p-3">
        <Form onSubmit={handleSubmit} noValidate>
          <h4 className="text-center mb-3 fw-bold">Profile Settings</h4>
          <div className="d-flex flex-column gap-3">
            {formFields.map((field) => returnControls(field))}
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </Form>
      </div>

      <div className="d-none d-md-block">
        <Form onSubmit={handleSubmit} noValidate>
          <div
            className="container d-flex justify-content-center align-items-center my-3"
            style={{ minHeight: "87vh" }}
          >
            <div
              className="card shadow p-4 w-100"
              style={{ maxWidth: "700px" }}
            >
              <h3 className="text-center mb-4 fw-bold">Profile Settings</h3>
              <div className="row g-2">
                {formFields.map((field) => returnControls(field))}
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ProfileSettings;
