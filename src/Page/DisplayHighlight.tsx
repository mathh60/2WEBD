import React, { useEffect, useState } from "react";
import fetchArtObject from "../Query/fetchArtObject";
import searchArtObjects from "../Query/searchArtObjects";
import DisplayHighlightContent from "../Components/DisplayHighlightContent";
import "../App.css";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const DisplayHighlight: React.FC = () => {
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ArtObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeaturedArtObjects = async () => {
      try {
        setLoading(true);
        
        const res = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects?isHighlight=true"
        );
        const data = await res.json();
        const objectIDs: number[] = data.objectIDs ? data.objectIDs.slice(0, 12) : [];
        const fetchPromises = objectIDs.map((id) => fetchArtObject(id));
        const objectsData = await Promise.all(fetchPromises);
        setArtObjects(objectsData);
      } catch (error) {
        console.error("Error fetching highlighted objects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArtObjects();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const objectsData = await searchArtObjects(searchTerm);
      setSearchResults(objectsData);
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <DisplayHighlightContent
        artObjects={artObjects}
        searchTerm={searchTerm}
        searchResults={searchResults}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        loading={loading}
      />
    </div>
  );
};

export default DisplayHighlight;