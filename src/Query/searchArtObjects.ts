import fetchArtObject from "./fetchArtObject";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const searchArtObjects = async (searchTerm: string): Promise<ArtObject[]> => {
  const searchResponse = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
  );
  if (!searchResponse.ok) {
    throw new Error("Failed to search object");
  }
  const searchData = await searchResponse.json();
  const objectsData: ArtObject[] = [];
  for (const objectID of searchData.objectIDs.slice(0, 5)) {
    const objectData = await fetchArtObject(objectID);
    objectsData.push(objectData);
  }
  return objectsData;
};

export default searchArtObjects;
