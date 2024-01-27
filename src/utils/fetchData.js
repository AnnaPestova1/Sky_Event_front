import axios from "axios";

export const register = (name, email, password) => {
  return axios.post(
    "http://localhost:3000/api/v1/auth/register",
    {
      name: name,
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

export const getAllData = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get("http://localhost:3000/api/v1/data", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
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
  return axios.patch(
    `http://localhost:3000/api/v1/data/${data._id}`,
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
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(`http://localhost:3000/api/v1/apiData/NASAPictureOfTheDay`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};
