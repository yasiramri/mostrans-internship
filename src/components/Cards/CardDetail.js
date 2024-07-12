// /src/components/CardDetail/CardDetail.js

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
    }
  }
`;

const CardDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { name, status, species, type, gender, origin, location, image } =
    data.character;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={image} alt={name} className="img-fluid" />
        </div>
        <div className="col-12 col-md-6">
          <h1>{name}</h1>
          <p>Status: {status}</p>
          <p>Species: {species}</p>
          <p>Type: {type}</p>
          <p>Gender: {gender}</p>
          <p>Origin: {origin.name}</p>
          <p>Location: {location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
