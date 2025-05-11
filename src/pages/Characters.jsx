import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Characters = () => {
  // Get the film ID from the route params
  const { id } = useParams();
  // State to store character data
  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();
  // Fetch character URLs for a given film, then fetch character details
  const getCharacterData = async (id) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
      const data = await response.json();
      // Extract the first 5 character URLs for simplicity
      const characterUrls = data.result.properties.characters.slice(0, 5);

      const characterData = await Promise.all(
        characterUrls.map(async (url) => {
          const res = await fetch(url);
          const data = await res.json();
          return data.result;
        })
      );
      // Update state with fetched character data
      setCharacters(characterData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getCharacterData(id);
  }, []);
  return (
    <div className="container">
      <h2 className="heading text-center mt-5 mb-4">Characters Info</h2>
      <a onClick={() => navigate("/")} className="go-back">
        <i className="bi bi-arrow-left"></i> Go Back
      </a>{" "}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Year of Birth</th>
            <th>Gender</th>
            <th>Height</th>
          </tr>
        </thead>
        {/* Loop through characters and display characters info */}

        {characters.map((character) => (
          <tbody key={character.uid}>
            <tr>
              <td>{character.properties.name}</td>
              <td>{character.properties.birth_year}</td>
              <td>{character.properties.gender}</td>
              <td>{character.properties.height}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Characters;
