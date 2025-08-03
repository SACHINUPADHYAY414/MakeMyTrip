import React, { useState } from "react";
import CustomInputField from "../../Components/CustomInput/CustomInputField.jsx";
import {
  ERROR_REQUIRED,
  ERROR_VALIDATE_EMAIL,
  ERROR_DOUBLE_SPACE,
  ERROR_LEADING_OR_TRAILING_SPACE,
  OPPS_MSG,
  SUCCESS_MSG,
  SERVER_ERROR
} from "../../Utils/strings.js";
import {
  sanitizeEmail,
  sanitizePassword,
  verifyEmail,
  verifyDoubleSpace,
  verifyStartingOrEndingCharacters,
  sanitizeInput
} from "../../Utils/allValidation.js";
import api from "../../Action/Api";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { customToast } = useToastr();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: ""
  });

  const [errors, setErrors] = useState({});

  const fields = [
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      required: true
      // readOnly: true
    },
    {
      id: "oldPassword",
      name: "oldPassword",
      label: "Old Password",
      placeholder: "Enter your old password",
      type: "password",
      required: true
    },
    {
      id: "newPassword",
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter your new password",
      type: "password",
      required: true
    }
  ];

  const handleChange = (e, required, label, pastedValue = "") => {
    const { name, value } = e.target;
    let updatedValue = sanitizeInput(value + pastedValue);

    if (name === "email") updatedValue = sanitizeEmail(updatedValue);
    else updatedValue = sanitizePassword(updatedValue);

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    let error = "";
    if (!updatedValue && required) error = ERROR_REQUIRED(label);
    if (verifyDoubleSpace(updatedValue)) error = ERROR_DOUBLE_SPACE;
    if (!verifyStartingOrEndingCharacters(updatedValue))
      error = ERROR_LEADING_OR_TRAILING_SPACE;

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e, label) => {
    const { name, value } = e.target;
    let error = "";

    if (!value) error = ERROR_REQUIRED(label);
    if (name === "email" && !verifyEmail(value)) error = ERROR_VALIDATE_EMAIL;

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasError = Object.entries(formData).some(([key, value]) => {
      if (!value) {
        setErrors((prev) => ({ ...prev, [key]: ERROR_REQUIRED(key) }));
        return true;
      }
      return false;
    });
    if (hasError) return;

    try {
      const res = await api.put("/change-password", formData);
      setFormData({ ...formData, oldPassword: "", newPassword: "" });
      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Password changed successfully.",
        life: 3000
      });
      navigate("/login");
    } catch (err) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: err.response?.data?.message || SERVER_ERROR,
        life: 3000
      });
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center my-3"
      style={{ minHeight: "87vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold">Change Password</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <CustomInputField
              key={field.id}
              type={field.type}
              field={field}
              value={formData[field.name]}
              placeholder={field.placeholder}
              readOnly={field.readOnly || false}
              onChange={(e) => handleChange(e, field.required, field.label)}
              onBlur={(e) => handleBlur(e, field.label)}
              error={errors[field.name]}
            />
          ))}
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary fw-semibold">
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
