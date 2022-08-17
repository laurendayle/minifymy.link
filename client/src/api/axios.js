import _axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axios = _axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json"},
  withCredentials: true,
  exposedHeaders: ["set-cookie"],
});

const refreshAuthLogic = async (failedReq) => {
  try {
    const res = await axios.get("/refresh");
    localStorage.setItem("user", res.data.accessToken);
    failedReq.response.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
  } catch (err) {
    console.log(err, 'err from axios instance');
  }
};

createAuthRefreshInterceptor(axios, refreshAuthLogic, { statusCodes: [401, 403]});

export default axios;