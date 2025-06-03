import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface SearchResultProps {
  searchResults: ArtObject[]; 
}

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  accessionYear: string;
}

const SearchResults: React.FC<SearchResultProps> = ({ searchResults }) => {
  return (
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
  );
};

export default SearchResults;