/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={img} alt="not found" />
        <h3>ohh? page not found</h3>
        <p>We cannot seem to find page you are looking for.</p>
        <Link to="/dashboard">Go Back</Link>
      </Wrapper>
    );
  }
  return (
    <>
      <Wrapper>
        <h2>Error</h2>
        <Link to="/" className="a">
          Go Back
        </Link>
      </Wrapper>
    </>
  );
};

export default Error;
