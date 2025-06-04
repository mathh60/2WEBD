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
  const [allResults, setAllResults] = useState<ArtObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setHasSearched(true);
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("title", title);
      if (artistDisplayName) queryParams.append("artistDisplayName", artistDisplayName);
      if (accessionYear) queryParams.append("accessionYear", accessionYear);

      const objectsData = await advancedSearch(queryParams);
      setAllResults(objectsData);
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Séparation des résultats exacts et similaires
  const exactResults = allResults.filter(obj => {
    let ok = true;
    if (title) ok = ok && obj.title.trim().toLowerCase() === title.trim().toLowerCase();
    if (artistDisplayName) ok = ok && obj.artistDisplayName.trim().toLowerCase() === artistDisplayName.trim().toLowerCase();
    if (accessionYear) ok = ok && obj.accessionYear.trim().toLowerCase() === accessionYear.trim().toLowerCase();
    return ok;
  });

  const similarResults = allResults.filter(obj => !exactResults.includes(obj));

  return (
    <div className="advanced-search-container" style={{ background: "#f6f6f9", minHeight: "100vh", padding: "40px 0" }}>
      <h1 style={{ textAlign: "center", marginBottom: "28px" }}>Advanced Search</h1>
      <div className="search-bar advanced-search-bar" style={{
        display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "32px",
      }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", minWidth: 180 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artistDisplayName}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", minWidth: 180 }}
          onChange={(e) => setArtistDisplayName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Accession Year"
          value={accessionYear}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", minWidth: 140 }}
          onChange={(e) => setAccessionYear(e.target.value)}
        />
        <button
          style={{
            background: "#2b4176", color: "white", border: "none", borderRadius: 8,
            padding: "10px 20px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s"
          }}
          onClick={handleSearch}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: 30 }}>Searching...</div>
      ) : hasSearched ? (
        <div>
          {/* Résultats exacts */}
          {exactResults.length > 0 ? (
            <>
              <h2 style={{ textAlign: "center", marginBottom: "22px", color: "#2b4176" }}>Résultats exacts</h2>
              <div className="art-list" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "28px", justifyItems: "center", padding: "0 18px"
              }}>
                {exactResults.map((result) => (
                  <Link
                    key={result.objectID}
                    to={`/object/${result.objectID}`}
                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <div className="art-item" style={{
                      background: "#fff", borderRadius: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      padding: "18px", width: "100%", maxWidth: "270px", minHeight: "370px",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      transition: "transform 0.18s, box-shadow 0.18s"
                    }}>
                      <img
                        src={result.primaryImage}
                        alt={result.title}
                        style={{
                          width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px",
                          marginBottom: "14px", background: "#e7e7e7"
                        }}
                      />
                      <h3 style={{ fontSize: "1.08rem", margin: "0 0 6px 0", textAlign: "center", color: "#23325e" }}>
                        {result.title}
                      </h3>
                      <p style={{ fontSize: "0.98rem", color: "#444", margin: "0 0 4px 0", textAlign: "center" }}>
                        <span style={{ color: "#6977a5" }}>Artist:</span> {result.artistDisplayName || <span style={{ color: "#bbb" }}>Unknown</span>}
                      </p>
                      <p style={{ fontSize: "0.98rem", color: "#444", margin: 0, textAlign: "center" }}>
                        <span style={{ color: "#6977a5" }}>Year:</span> {result.accessionYear || <span style={{ color: "#bbb" }}>N/A</span>}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", color: "#d83d4b", marginTop: 30 }}>
              Aucun objet ne correspond exactement à votre recherche.
            </div>
          )}
          {/* Recherches similaires */}
          {similarResults.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ textAlign: "center", marginBottom: "18px", color: "#2b4176" }}>
                Recherches similaires
              </h2>
              <div className="art-list" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "28px", justifyItems: "center", padding: "0 18px"
              }}>
                {similarResults.map((result) => (
                  <Link
                    key={result.objectID}
                    to={`/object/${result.objectID}`}
                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <div className="art-item" style={{
                      background: "#f5f5f5", borderRadius: "14px", boxShadow: "0 1px 5px rgba(0,0,0,0.04)",
                      padding: "18px", width: "100%", maxWidth: "270px", minHeight: "370px",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      opacity: 0.85
                    }}>
                      <img
                        src={result.primaryImage}
                        alt={result.title}
                        style={{
                          width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px",
                          marginBottom: "14px", background: "#e7e7e7"
                        }}
                      />
                      <h3 style={{ fontSize: "1.08rem", margin: "0 0 6px 0", textAlign: "center", color: "#23325e" }}>
                        {result.title}
                      </h3>
                      <p style={{ fontSize: "0.98rem", color: "#444", margin: "0 0 4px 0", textAlign: "center" }}>
                        <span style={{ color: "#6977a5" }}>Artist:</span> {result.artistDisplayName || <span style={{ color: "#bbb" }}>Unknown</span>}
                      </p>
                      <p style={{ fontSize: "0.98rem", color: "#444", margin: 0, textAlign: "center" }}>
                        <span style={{ color: "#6977a5" }}>Year:</span> {result.accessionYear || <span style={{ color: "#bbb" }}>N/A</span>}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#999", marginTop: 30 }}>
          No results yet. Use the fields above to search artworks!
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;