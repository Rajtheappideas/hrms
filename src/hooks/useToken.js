import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useToken = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const history = useHistory()

  useEffect(() => {
    const useremail = localStorage.getItem("userEmail");
    const role = localStorage.getItem("designation");
    const token = localStorage.getItem("token");
    if (useremail && role && token) {
      setUserEmail(JSON.parse(useremail));
      setUserRole(JSON.parse(role));
      setUserToken(JSON.parse(token));
    }
    // else{
    //   history.push("/")
    // }
  });
  return {
    userEmail,
    userRole,
    userToken,
  };
};

export default useToken;
