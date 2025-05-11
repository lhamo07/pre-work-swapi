import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpeg";

const Film = () => {
  const [filmData, setFilmData] = useState([]);
  // State to store fetched film data
  const navigate = useNavigate();

  // Function to fetch film data from SWAPI
  const getFilmData = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      // Set the fetched film data to state
      setFilmData(data.result);
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };
  useEffect(() => {
    getFilmData();
  }, []);
  // Function to handle View Characters on click
  const viewCharacter = (id) => {
    // Navigate to characters page with selected film ID
    navigate(`/character/${id}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-hero">
        <p className="hero-text">
          <img src={banner} alt="banner-img" className="hero-img" />
        </p>
      </section>
      {/* main content section */}
      <section className="section-main">
        <div className="container">
          <h2 className="heading text-center mt-5 mb-4">Film information</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Director</th>
                <th>Release Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Loop through each film and display in a row */}
            {filmData.map((filmInfo) => (
              <tbody key={filmInfo.uid}>
                <tr>
                  <td>{filmInfo.properties.title}</td>
                  <td>{filmInfo.properties.director}</td>
                  <td>{filmInfo.properties.release_date}</td>
                  <td>
                    <a
                      href=""
                      className="view-characters badge"
                      onClick={() => viewCharacter(filmInfo.uid)}
                    >
                      View Characters
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </div>
  );
};

export default Film;
