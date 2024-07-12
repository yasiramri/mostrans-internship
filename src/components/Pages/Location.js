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
            <div key={characterId} className="col">
              <CharacterDetails characterId={characterId} />
            </div>
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
      to={`/${characterId}`}
      className={`col-4 mb-4 position-relative text-dark text-decoration-none ${styles.card}`}
    >
      <div className="card mb-4">
        <img src={image} className={`card-img-top ${styles.img}`} alt={name} />
        <div className="card-body">
          <h5 className={`card-title ${styles.cardTitle}`}>{name}</h5>
          <p className={`card-text ${styles.cardText}`}>
            <strong>Status:</strong> {status}
          </p>
          <p className={`card-text ${styles.cardText}`}>
            <strong>Species:</strong> {species}
          </p>
          <p className={`card-text ${styles.cardText}`}>
            <strong>Origin:</strong> {origin.name}
          </p>
          <p className={`card-text ${styles.cardText}`}>
            <strong>Gender:</strong> {gender}
          </p>
          <div
            className={`badge ${
              status === "Dead"
                ? styles.bgDanger
                : status === "Alive"
                ? styles.bgPrimary
                : styles.bgSecondary
            }`}
          >
            {status}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Location;
