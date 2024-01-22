"use client";

import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  background-color: white;
  padding: 80px 0;  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    line-height: 1.5;
    font-family: "Poppins", sans-serif;
  }

  .container {
    max-width: 1170px;
    margin: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  ul {
    list-style: none;
  }

  .footer-col {
    width: 25%;
    padding: 0 15px;
  }

  .footer-col h4 {
    font-size: 17px;
    color: #000000;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
  }

  .footer-col h4::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #e91e63;
    width: 50px;
    height: 2px;
  }

  .footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
  }

  .footer-col ul li a {
    color: rgba(0, 0, 0, 0.5);
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
    text-transform: capitalize;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer-col ul li a:hover {
    color: rgba(0, 0, 0, 1);
    padding-left: 7px;
  }

  .footer-col .social-links a {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1);
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    text-align: center;
    margin: 0 10px 10px 0;
    line-height: 40px;
    transition: all 0.3s ease;
  }

  .footer-col .social-links a:hover {
    color: #151515;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 767px) {
    .footer-col {
      width: 50%;
      margin-bottom: 30px;
    }
  }

  @media (max-width: 574px) {
    .footer-col {
      width: 100%;
    }
  }
`;

const Footer = () => {
  return (
    <Container>
      <div className="container row">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li>
              <a href="#">about us</a>
            </li>
            <li>
              <a href="#">our services</a>
            </li>
            <li>
              <a href="#">privacy policy</a>
            </li>
            <li>
              <a href="#">visit website</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">shipping</a>
            </li>
            <li>
              <a href="#">returns</a>
            </li>
            <li>
              <a href="#">order status</a>
            </li>
            <li>
              <a href="#">payment options</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>online shop</h4>
          <ul>
            <li>
              <a href="#">download</a>
            </li>
            <li>
              <a href="#">changelog</a>
            </li>
            <li>
              <a href="#">github</a>
            </li>
            <li>
              <a href="#">all version</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
