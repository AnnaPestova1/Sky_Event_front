import axios from "axios";

export const register = (name, email, password, confirmPassword) => {
  return axios.post(
    "http://localhost:3000/api/v1/auth/register",
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
    "http://localhost:3000/api/v1/auth/login",
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
  return axios.post("http://localhost:3000/api/v1/auth/logout");
};

export const getAllData = (page, filtering) => {
  console.log(page);
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `http://localhost:3000/api/v1/data?page=${page}&filtering=${filtering}`,
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
  return axios.get(`http://localhost:3000/api/v1/data/${dataId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const createData = data => {
  console.log("fetch create data", data);
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    `http://localhost:3000/api/v1/data`,
    {
      ...data
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const editData = data => {
  console.log("fetch patch data", data);
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.patch(`http://localhost:3000/api/v1/data/${data._id}`, data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const deleteData = dataId => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.delete(`http://localhost:3000/api/v1/data/${dataId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const getCometsData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(`http://localhost:3000/api/v1/apiData/comets/${year}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const getAsteroidsData = year => {
  console.log(year);
  const jwtToken = sessionStorage.getItem("jwtToken");
  console.log(jwtToken);
  return axios.get(`http://localhost:3000/api/v1/apiData/asteroids/${year}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const getSolarEclipsesData = year => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(
    `http://localhost:3000/api/v1/apiData/solarEclipses/${year}`,
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
    `http://localhost:3000/api/v1/apiData/lunarEclipses/${year}`,
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
    `http://localhost:3000/api/v1/apiData/meteorShowers/${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getNASAPictureOfTheDay = () => {
  return axios.get(`http://localhost:3000/api/v1/apiImg/NASAPictureOfTheDay`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getGoogleOAuthURL = () => {
  // console.log(import.meta.env.VITE_CLIENT_ID);
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
  console.log({ options });
  const qs = new URLSearchParams(options);
  console.log(qs.toString());
  const url = `${rootURL}?${qs.toString()}`;
  return url;
  // return axios.get(`${rootURL}?${qs.toString()}`);
  // return axios.get(`https://accounts.google.com/o/oauth2/v2/auth`, {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });
};
