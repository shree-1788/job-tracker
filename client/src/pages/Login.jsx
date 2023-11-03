/* eslint-disable no-unused-vars */
import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import {
  Link,
  Form,
  useNavigation,
  redirect,
  useNavigate,
} from "react-router-dom";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged in successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const naviagte = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive!");
      return naviagte("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form action="" method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="text" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
