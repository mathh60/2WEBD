interface ArtObject {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
    accessionYear: string;
  }
  
  const advancedSearch = async (queryParams: URLSearchParams): Promise<ArtObject[]> => {
    const searchResponse = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${queryParams.toString()}`
    );
    if (!searchResponse.ok) {
      throw new Error("Failed to search objects");
    }
    const searchData = await searchResponse.json();
    const objectsData: ArtObject[] = [];
    for (const objectID of searchData.objectIDs.slice(0, 3)) {
      const objectResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      if (!objectResponse.ok) {
        throw new Error("Failed to fetch object");
      }
      const objectData = await objectResponse.json();
      objectsData.push({
        objectID: objectData.objectID,
        title: objectData.title,
        primaryImage: objectData.primaryImage,
        artistDisplayName: objectData.artistDisplayName,
        accessionYear: objectData.accessionYear,
      });
    }
    return objectsData;
  };
  
  export default advancedSearch;