import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from "reactstrap";
import navLogo from "../../assets/nav-logo.png";
import './CustomButton.scss';

function CustomButton({ className="", text, ...props }) {
    return <button className={`${className} custom-button`} {...props}>{text}</button>;
}

export default CustomButton;
