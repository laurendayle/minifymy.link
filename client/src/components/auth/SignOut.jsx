
import axios from "axios";
import sessionAtom from "../../recoil/atoms/sessionAtom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Navigate } from "react-router";

const url = import.meta.env.VITE_URL;
const config = import.meta.env.VITE_AXIOS_CONFIG;

const SignOut = () => {

  const [session, setSession] = useRecoilState(sessionAtom);
  const [error, setError] = useState(null);

  const handleClick = async (e) => {
    try {
      const res = await axios.post(url + "/user/logout", session, config);
      if (res) {
        setSession(null);
      }
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError({ message: "Something went wrong" });
      }
    }
  }
  return (
    <div>
      <button onClick={(e) => handleClick(e)}>Sign Out</button>
    </div>

  )
};

export default SignOut;
