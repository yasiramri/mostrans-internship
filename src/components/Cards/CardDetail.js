import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      location {
        id
        name
      }
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

const CardDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const [locationName, setLocationName] = useState("");
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    // Function to load assignments from IndexedDB on component mount
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
        event.target.result.forEach((item) => {
          savedAssignments[item.id] = item.locationName;
        });
        setAssignments(savedAssignments);
      };
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      // Create object store if it doesn't exist
      const objectStore = db.createObjectStore("assignments", {
        keyPath: "id",
      });
    };
  };

  const saveAssignmentToIndexedDB = (characterId, locationName) => {
    const request = window.indexedDB.open("characterAssignments", 1);

    request.onerror = function (event) {
      console.error("Error opening IndexedDB:", event.target.errorCode);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction(["assignments"], "readwrite");
      const objectStore = transaction.objectStore("assignments");

      objectStore.put({ id: characterId, locationName });

      transaction.oncomplete = function () {
        const newAssignments = { ...assignments, [characterId]: locationName };
        setAssignments(newAssignments);
      };

      transaction.onerror = function (event) {
        console.error("Error saving assignment:", event.target.error);
      };
    };
  };

  const handleAssignLocation = () => {
    if (!locationName.trim()) {
      alert("Location name cannot be empty.");
      return;
    }

    saveAssignmentToIndexedDB(id, locationName.trim());
    setLocationName("");
    alert("Character assigned to location.");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { character } = data;

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex flex-column gap-3">
        <h1 className="text-center">{character.name}</h1>

        <img className="img-fluid" src={character.image} alt="" />
        <div
          className={`badge bg-${
            character.status === "Dead"
              ? "danger"
              : character.status === "Alive"
              ? "success"
              : "secondary"
          } fs-5`}
        >
          {character.status}
        </div>
        <div className="content">
          <div className="">
            <span className="fw-bold">Gender : </span>
            {character.gender}
          </div>
          <div className="">
            <span className="fw-bold">Location: </span>
            {assignments[id] || "Unassigned"}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {character.origin?.name}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {character.species}
          </div>
        </div>

        {/* Form to assign location */}
        <div className="mt-3">
          <label htmlFor="locationName" className="form-label">
            Assign Character to Location:
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="locationName"
              placeholder="Enter unique location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAssignLocation}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
