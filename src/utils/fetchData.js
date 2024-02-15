import axios from "axios";

export const register = (name, email, password, confirmPassword) => {
  return axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
    {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const login = (email, password) => {
  return axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
    {
      email: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const logout = () => {
  return axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`);
};

export const getAllData = (page, filtering) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/v1/data?page=${page}&filtering=${filtering}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getSingleData = dataId => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/data/${dataId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const createData = data => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/data`,
    {
      ...data
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const editData = data => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/data/${data._id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const deleteData = dataId => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/data/${dataId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getCometsData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiData/comets/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getAsteroidsData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiData/asteroids/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getSolarEclipsesData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiData/solarEclipses/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getLunarEclipsesData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiData/lunarEclipses/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getMeteorShowersData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiData/meteorShowers/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getNASAPictureOfTheDay = () => {
  return axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/apiImg/NASAPictureOfTheDay`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const getGoogleOAuthURL = () => {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: import.meta.env.VITE_REDIRECT_URL,
    client_id: import.meta.env.VITE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ].join(" ")
  };
  const qs = new URLSearchParams(options);
  const url = `${rootURL}?${qs.toString()}`;
  return url;
};
