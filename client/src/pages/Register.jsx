/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData.entries());

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="shree" />
        <FormRow type="text" name="lastName" defaultValue="patil" />
        <FormRow type="text" name="location" defaultValue="pune" />
        <FormRow type="text" name="email" defaultValue="shree@gmail.com" />
        <FormRow type="password" name="password" defaultValue="12345678" />
        <button type="submit" className="btn btn-block">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
