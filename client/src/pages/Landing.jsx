/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import mainphoto from "../assets/images/mainphoto.svg";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            nam voluptate exercitationem ad harum doloribus laboriosam
            voluptatum quas nobis deleniti, ex sunt consequatur delectus omnis
            voluptatem neque quae fuga ea minus distinctio!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={mainphoto} className="img main-img" alt="" />
      </div>
    </Wrapper>
  );
};

export default Landing;
