// /src/App.js
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
  const [searchStatus, setSearchStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: pageNumber,
      filter: {
        name: searchTerm,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { info, results } = data.characters;

  const handleSearch = (term) => {
    setSearchTerm(term);
    refetch({
      page: 1,
      filter: {
        name: term,
      },
    }).then((result) => {
      if (result.data.characters.results.length > 0) {
        setSearchStatus(true);
      } else {
        setSearchStatus(false);
      }
    });
    setPageNumber(1);
  };

  const handlePageChange = (selectedItem) => {
    const selectedPage = selectedItem.selected + 1;
    setPageNumber(selectedPage);
    refetch({
      page: selectedPage,
      filter: {
        name: searchTerm,
      },
    });
  };

  return (
    <div className="App">
      <h1 className="text-center text-success ubuntu my-4">
        MOSTRANS ASSIGNMENT
      </h1>

      <Search
        onSearch={handleSearch}
        onSearchStatusChange={setSearchStatus}
        setPageNumber={setPageNumber}
      />

      <div className="container">
        <div className="row">
          <Filters />
          <div className="col-8">
            {searchStatus ? (
              <div className="row">
                <Cards results={results} />
              </div>
            ) : (
              <p className="text-center">Karakter tidak ditemukan.</p>
            )}
          </div>
        </div>
      </div>

      <Pagination pageCount={info.pages} onPageChange={handlePageChange} />
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
