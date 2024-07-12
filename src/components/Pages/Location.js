import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import styles from "./Episodes.module.scss";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      origin {
        id
        name
      }
      gender
      image
      status
      species
    }
  }
`;

const Location = () => {
  const [assignments, setAssignments] = useState({});
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    loadAssignmentsFromIndexedDB();
  }, []);

  const loadAssignmentsFromIndexedDB = () => {
    const request = window.indexedDB.open("characterAssignments", 1);
    request.onerror = function (event) {
      console.error("Error opening IndexedDB:", event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a transaction to read data
      const transaction = db.transaction(["assignments"], "readonly");
      const objectStore = transaction.objectStore("assignments");

      // Get all saved assignments
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        const savedAssignments = {};
        const locations = new Set();
        event.target.result.forEach((item) => {
          savedAssignments[item.id] = item.locationName;
          locations.add(item.locationName);
        });
        setAssignments(savedAssignments);
        setUniqueLocations(Array.from(locations));
      };
    };
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Assigned Locations</h1>
      <div className="mb-3">
        <label htmlFor="locationDropdown" className="form-label">
          Select Location:
        </label>
        <select
          id="locationDropdown"
          className="form-select"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">-- Select Location --</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {Object.keys(assignments)
          .filter(
            (characterId) => assignments[characterId] === selectedLocation
          )
          .map((characterId) => (
            <CharacterDetails key={characterId} characterId={characterId} />
          ))}
      </div>
    </div>
  );
};

const CharacterDetails = ({ characterId }) => {
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, origin, gender, image, status, species } = data.character;

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/${characterId}`}
      className="col-lg-4 col-md-6 col-12 mb-4 position-relative text-dark"
    >
      <div
        className={`${styles.cards} d-flex flex-column justify-content-center`}
      >
        <img src={image} alt="" className={`${styles.img} img-fluid`} />
        <div style={{ padding: "10px" }} className="content">
          <div className="fs-4 fw-bold mb-4">{name}</div>
          <div className="">
            <div className="fs-6">{species}</div>
            <div className="fs-6">{gender}</div>
          </div>
        </div>
      </div>
      {(() => {
        if (status === "Dead") {
          return (
            <div
              className={`${styles.badge} position-absolute badge bg-danger`}
            >
              {status}
            </div>
          );
        } else if (status === "Alive") {
          return (
            <div
              className={`${styles.badge} position-absolute badge bg-primary`}
            >
              {status}
            </div>
          );
        } else {
          return (
            <div
              className={`${styles.badge} position-absolute badge bg-secondary`}
            >
              {status}
            </div>
          );
        }
      })()}
    </Link>
  );
};

export default Location;
