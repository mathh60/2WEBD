interface ArtObject {
    objectID: number;
    title: string;
    primaryImage: string;
  }
  
  const fetchArtObject = async (id: number): Promise<ArtObject> => {
    const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    if (!objectResponse.ok) {
      throw new Error("Failed to fetch object");
    }
    const objectData = await objectResponse.json();
    return {
      objectID: objectData.objectID,
      title: objectData.title,
      primaryImage: objectData.primaryImage,
    };
  };
  
  export default fetchArtObject;