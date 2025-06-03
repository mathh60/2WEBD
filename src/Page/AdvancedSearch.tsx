import React, { useState } from "react";
import { Link } from "react-router-dom";
import advancedSearch from "../Query/advancedSearch";
import "../App.css";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  accessionYear: string;
}

const AdvancedSearch: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [artistDisplayName, setArtistDisplayName] = useState<string>("");
  const [accessionYear, setAccessionYear] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ArtObject[]>([]);

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("title", title);
      if (artistDisplayName) queryParams.append("artistDisplayName", artistDisplayName);
      if (accessionYear) queryParams.append("accessionYear", accessionYear);

      const objectsData = await advancedSearch(queryParams);
      setSearchResults(objectsData);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div className="advanced-search-container">
      <h1 className="advanced-search-title">Advanced Search</h1>
      <div className="search-bar advanced-search-bar">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artistDisplayName}
          onChange={(e) => setArtistDisplayName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Accession Year"
          value={accessionYear}
          onChange={(e) => setAccessionYear(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          {searchResults.map((result) => (
            <Link key={result.objectID} to={`/object/${result.objectID}`}>
              <div className="art-item">
                <h3>{result.title}</h3>
                <p>Artist: {result.artistDisplayName}</p>
                <p>Year: {result.accessionYear}</p>
                <img src={result.primaryImage} alt={result.title} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
