interface ArtObject {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
    accessionYear: string;
}

const advancedSearch = async (
    title: string,
    artistDisplayName: string,
    accessionYear: string
): Promise<ArtObject[]> => {
    // Concatène tous les champs non vides dans une seule string de recherche
    const q = [title, artistDisplayName, accessionYear].filter(Boolean).join(" ");
    const searchResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(q)}`
    );
    if (!searchResponse.ok) {
        throw new Error("Failed to search objects");
    }
    const searchData = await searchResponse.json();
    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
        return [];
    }
    const objectsData: ArtObject[] = [];
    // Récupère les 20 premiers objets pour avoir plus de résultats
    for (const objectID of searchData.objectIDs.slice(0, 20)) {
        const objectResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        if (!objectResponse.ok) {
            continue;
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