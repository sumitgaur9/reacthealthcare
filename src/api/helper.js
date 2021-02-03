import axios from "axios";

const axiosInstance = axios.create();

let params = {};
let axiosConfig = {};
let currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
if(currentUser && currentUser.token) {
  axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${currentUser.token}`
    }
  }
}
axiosInstance.defaults.headers.common=axiosConfig.headers;

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response", response);

    return response;
  },
  (error) => {
    console.log("axiosInstance error", error);
    if (
      error.response &&
      error.response.status &&
      error.response.status !== 200
    ) {
      return {
        message:
          error.response.data.message ||
          error.response.data.error ||
          "Encountered an unknown error. Try again.",
        status: false,
        statusCode: error.response.status,
      };
    } else {
      return Promise.reject(error);
    }
  }
);

function remove_non_ascii(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/[^\x20-\x7E]/g, "");
}

export const GET = async (url, params, options) => {
  let getRes = await axiosInstance.get(
    remove_non_ascii(url),
    { params },
    options
  );
  if (getRes.status === 200 || getRes.status === 201) {
    return { data: getRes.data, status: true, statusCode: getRes.status };
  } else {
    return {
      message: getRes.message,
      status: false,
      statusCode: getRes.statusCode,
    };
  }
};

export const GETNEW = async (url, params, options) => {
  let getRes = await axiosInstance.get(
    remove_non_ascii(url),
    { params },
    options
  );
  if (getRes.status === 200 || getRes.status === 201) {
    return { data: getRes, status: true, statusCode: getRes.status };
  } else {
    return {
      message: getRes.message,
      status: false,
      statusCode: getRes.statusCode,
    };
  }
};

export const DELETE = async (url, params, options) => {
  let getRes = await axiosInstance.delete(url, { params }, options);
  if (getRes.status === 200) {
    return { data: getRes.data, status: true, statusCode: getRes.status };
  } else {
    return {
      message: getRes.message,
      status: false,
      statusCode: getRes.status,
    };
  }
};

export const POST = async (url, body, options) => {
  let getRes = await axiosInstance.post(url, body, options);
  console.log("outside post")
  document.body.classList.add('loading-indicator');
  if (getRes.status === 200 || getRes.status === 201) {
    console.log("inside response post")
    return { data: getRes.data, status: true, statusCode: getRes.status };
  } else {
    return {
      message: getRes.message,
      status: false,
      statusCode: getRes.status,
    };
  }
};

export const PUT = async (url, body, options) => {
  let getRes = await axiosInstance.put(remove_non_ascii(url), body, options);
  console.log("PUT getRes", getRes);
  if (getRes.status === 200) {
    return { data: getRes.data, status: true, statusCode: getRes.status };
  } else {
    return {
      message: getRes.message,
      status: false,
      statusCode: getRes.status,
    };
  }
};

const cache = (url, params) => {};
