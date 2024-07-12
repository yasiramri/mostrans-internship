import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-ligth bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1 className="fs-3 text-success ubuntu navbar-brand">
              MOSTRANS ASSIGMENT
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <style jsx>
              {`
                button[aria-expanded="false"] > .close {
                  display: none;
                }

                button[aria-expanded="true"] > .open {
                  display: none;
                }
              `}
            </style>
            <i class="fa-solid fa-bars open fw-bold text-dark"></i>
            <i class="fa-solid fa-xmark close fw-bold text-dark"></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  aria-current="page"
                  to="/"
                >
                  Characters
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/episodes" className="nav-link">
                  Episodes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/location" className="nav-link">
                  Location
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
