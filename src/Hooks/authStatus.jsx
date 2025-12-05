import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SetAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);
//   console.log(user);

  const [userExist, setUserExist] = useState(false);
  const [checkUser, setCheckUser] = useState(true);
  useEffect(() => {
    user ? setUserExist(true) : setUserExist(false);
    setCheckUser(false);
  }, [user]);
  return { userExist, checkUser };
};

export default SetAuthStatus;
