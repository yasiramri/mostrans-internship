import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "./graphql/client";
import Filters from "./components/Filters/Filters";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./components/Pages/Episodes";
import CardDetail from "./components/Cards/CardDetail";
import Location from "./components/Pages/Location";

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

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchStatus, setSearchStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: pageNumber,
      filter: {
        name: searchTerm,
        status: status,
        gender: gender,
        species: species,
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
        status: status,
        gender: gender,
        species: species,
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
        status: status,
        gender: gender,
        species: species,
      },
    });
  };

  const clearFilters = () => {
    setStatus("");
    setGender("");
    setSpecies("");
    setSearchTerm("");
    refetch({
      page: 1,
      filter: {
        name: "",
        status: "",
        gender: "",
        species: "",
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

  return (
    <div className="App">
      <h1 className="text-center text-success ubuntu my-4">Rick & Morty</h1>
      <Search
        onSearch={handleSearch}
        onSearchStatusChange={setSearchStatus}
        setPageNumber={setPageNumber}
      />
      <div className="container">
        <div className="row">
          <Filters
            setStatus={setStatus}
            setGender={setGender}
            setSpecies={setSpecies}
            clearFilters={clearFilters}
          />
          <div className="col-lg-8 col-12">
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetail />} />
        <Route path="/episodes/:id" element={<CardDetail />} />{" "}
        <Route path="/location/" element={<Location />} />{" "}
      </Routes>
    </Router>
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
