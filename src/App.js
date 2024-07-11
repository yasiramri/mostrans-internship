import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "./graphql/client";
import Filters from "./components/Filters/Filters";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";

const GET_CHARACTERS = gql`
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
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

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("Smith");

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: pageNumber,
      filter: {
        name: searchTerm, // Pass the search term as part of the filter
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { info, results } = data.characters;

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPageNumber(1); // Reset page number when performing a new search
    refetch(); // Refetch the data with the new search term
  };

  return (
    <div className="App">
      <h1 className="text-center text-success ubuntu my-4">
        MOSTRANS ASSIGMENT
      </h1>

      <Search onSearch={handleSearch} />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
          <div className="col-8">
            <div className="row">
              <Cards results={results} />
            </div>
          </div>
        </div>
      </div>

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
}

function AppWithApollo() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWithApollo;
