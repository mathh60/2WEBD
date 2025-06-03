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
    const fetchArtObjects = async () => {
      try {
        setLoading(true); 
        const objectIDs = [100, 200, 300, 400, 500, 150, 245, 350, 50, 1, 25, 65];
        const objectsData: ArtObject[] = [];
        for (const id of objectIDs) {
          const objectData = await fetchArtObject(id);
          objectsData.push(objectData);
        }
        setArtObjects(objectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtObjects();
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
