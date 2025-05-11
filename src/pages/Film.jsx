import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpeg";

const Film = () => {
  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFilmData = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      setFilmData(data.result);
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };
  useEffect(() => {
    getFilmData();
  }, []);
  const viewCharacter = (id) => {
    navigate(`/character/${id}`);
    console.log("id", id);
  };

  return (
    <div>
      <section className="section-hero">
        <p className="hero-text">
          <img src={banner} alt="banner-img" className="hero-img" />
        </p>
      </section>
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
