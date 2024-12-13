import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const apiErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data.message);
    const errMsg = error.response?.data?.message || "Something went wrong";
    throw new Error(errMsg);
  }

  if (error instanceof Error) {
    console.log(error.message);
    throw error;
  }

  console.log(error);
  throw new Error("Something went wrong");
};

export { api, apiErrorHandler };
