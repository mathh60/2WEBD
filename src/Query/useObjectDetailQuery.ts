import { useQuery } from "@tanstack/react-query";
import { ObjectDetail } from "../Components/Type"; 

export function useObjectDetailQuery(objectId: number) {
  return useQuery({
    queryKey: ['object', objectId], 
    queryFn: async () => {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`); 

      if (!response.ok) {
        throw new Error('Failed to fetch object details'); 
      }

      const data = await response.json();
      return data as ObjectDetail;
    },
  });
}
