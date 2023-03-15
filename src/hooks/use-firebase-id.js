import { useCallback } from "react";
const useFirebaseId = () => {
  const getFirebaseId = useCallback(
    async (userId, databaseUrl) => {
      let firebaseId = "";

      try {
        const response = await fetch(databaseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        for (const key in data) {
          if (data[key].id === userId) {
            firebaseId = key;
            console.log("firebase ID:", firebaseId);
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      return firebaseId;
    },
    []
  );

  return { getFirebaseId };
};

export default useFirebaseId;
