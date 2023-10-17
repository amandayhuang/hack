import { useState, useEffect } from "react";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";

export function usePassageCurrentUser() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    id: null,
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    try {
      let cancelRequest = false;

      new PassageUser().userInfo().then((userInfo) => {
        if (cancelRequest) {
          return;
        }
        if (userInfo === undefined) {
          setResult({
            isLoading: false,
            isAuthorized: false,
            id: null,
            email: "",
            firstName: "",
            lastName: "",
          });
          return;
        }

        setResult({
          isLoading: false,
          isAuthorized: true,
          id: userInfo.id,
          email: userInfo.email,
          firstName: userInfo.user_metadata.first_name,
          lastName: userInfo.user_metadata.last_name,
        });
      });
      return () => {
        cancelRequest = true;
      };
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);
  return result;
}
