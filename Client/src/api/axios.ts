import axios from "axios";

const BASE_URL = "http://localhost:5000/image-morph/api/v1/";

const axi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Authentication Routes
export const logIn = (authData: ILoginUser) => axi.post("user/login", authData);
export const singIn = (userData: IRegisterUser) => axi.post("user/signup", userData);

export const logOut = () => axiosPrivate.post("user/logout");
export const currentUser = () => axiosPrivate.get("user/current-user");

export const text2imageConvert = (textData: IText2Image) =>
  axiosPrivate.post("image/text-image", textData);
export const imageModification = (promptData: FormData) =>
  axiosPrivate.post("image/image-modification", promptData);
