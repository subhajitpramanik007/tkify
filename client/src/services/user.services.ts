import { api, apiErrorHandler } from "@/lib/api";
import { TLoginFormSchema, TRegisterFormSchema } from "@/lib/schemas";
import { TUser } from "@/lib/types";

const loginService = async (values: TLoginFormSchema) => {
  try {
    const response = await api.post("/users/login", values);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const registerService = async (values: TRegisterFormSchema) => {
  try {
    const response = await api.post("/users/register", values);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const refreshTokenService = async () => {
  try {
    const response = await api.post("/users/refresh-token");
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const logoutService = async () => {
  try {
    await api.post("/users/logout");
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const checkAuthService = async (): Promise<boolean> => {
  try {
    const response = await api.get("/users/check-auth");
    return response.status === 200;
  } catch {
    return false;
  }
};

const getMeService = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const updateMeService = async (values: Partial<TUser>) => {
  try {
    const response = await api.put("/users/update-me", values);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const uploadAvatarService = async (formData: FormData) => {
  try {
    const response = await api.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const deleteMeService = async () => {
  try {
    await api.delete("/users/delete-me");
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const checkEmailIsExistService = async (email: string) => {
  try {
    const response = await api.post(`/users/email/${email}`);
    return response;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export {
  loginService,
  registerService,
  refreshTokenService,
  logoutService,
  checkAuthService,
  getMeService,
  updateMeService,
  uploadAvatarService,
  deleteMeService,
  checkEmailIsExistService
};
