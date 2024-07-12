import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Cards/Cards";
import InputGroup from "../Filters/Category/InputGroup";

const EPISODE_QUERY = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      air_date
      characters {
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
  }
`;

const Episodes = () => {
  const [id, setId] = React.useState(1);
  const { loading, error, data } = useQuery(EPISODE_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { episode } = data;

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center mb-3">
          Episode name :{" "}
          <span className="text-success">{episode.name || "Unknown"}</span>
        </h1>
        <h5 className="text-center">
          Air Date: {episode.air_date || "Unknown"}
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Pick Episode</h4>
          <InputGroup name="Episode" changeID={setId} total={51} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Card page="/episodes/" results={episode.characters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
