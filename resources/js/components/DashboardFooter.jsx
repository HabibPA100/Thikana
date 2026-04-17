import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Brand Info */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-warning">RentHome</h4>
            <p>
              Find your perfect rental home بسهولة! We provide verified houses,
              apartments, and flats for rent at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/properties" className="text-light text-decoration-none">Properties</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Property Types</h5>
            <ul className="list-unstyled">
              <li>Apartment</li>
              <li>Family House</li>
              <li>Bachelor Room</li>
              <li>Office Space</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Contact</h5>
            <p>Email: support@renthome.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-light" />

        {/* Bottom Footer */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <p className="mb-0">
            © {new Date().getFullYear()} RentHome. All rights reserved.
          </p>

          {/* Social Icons */}
          <div>
            <a href="#" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;