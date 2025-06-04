import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface DisplayHighlightContentProps {
  artObjects: ArtObject[];
  searchTerm: string;
  searchResults: ArtObject[];
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  loading: boolean;
}

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const DisplayHighlightContent: React.FC<DisplayHighlightContentProps> = ({
  artObjects,
  searchTerm,
  searchResults,
  onSearchTermChange,
  onSearch,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const paginate = (items: ArtObject[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const displayItems = searchTerm ? searchResults : artObjects;
  const paginatedItems = paginate(displayItems, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Metropolitan Museum of Art</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div className="text-center">
        {loading ? (
          <div className="art-list">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div key={index} className="art-item placeholder">
                <div className="placeholder-image"></div>
                <div className="placeholder-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="art-list">
            {paginatedItems.map((artObject) => (
              <Link
                key={artObject.objectID}
                to={`/object/${artObject.objectID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="art-item">
                  {artObject.primaryImage ? (
                    <img
                      src={artObject.primaryImage}
                      alt={artObject.title}
                      style={{ width: "100%", height: "auto", maxHeight: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="placeholder-image"></div>
                  )}
                  <h3>{artObject.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Précédent
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= displayItems.length}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayHighlightContent;