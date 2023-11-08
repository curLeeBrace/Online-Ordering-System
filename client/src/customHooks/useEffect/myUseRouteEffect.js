import { getCookie } from "../cookiesHandler";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const useVerificationRouteProtection = (setEmail, path, option) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getEmail = getCookie("emailVerification");
    if (!getEmail) {
      navigate(path, option);
    }

    setEmail(getEmail);
  }, []);
};
