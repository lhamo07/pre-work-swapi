import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const Characters = () => {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();

  const getCharacterData = async (id) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
      const data = await response.json();
      const characterUrls = data.result.properties.characters.slice(0, 5);

      const characterData = await Promise.all(
        characterUrls.map(async (url) => {
          const res = await fetch(url);
          const data = await res.json();
          return data.result;
        })
      );
      setCharacters(characterData);
      console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(id);
  useEffect(() => {
    getCharacterData(id);
  }, []);
  console.log(characters);
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
