import { api, apiErrorHandler } from "@/lib/api";
import { TUser } from "@/lib/types";

interface GetUsersResponse {
  users: TUser[];
}

const getOnlineUsers = async (): Promise<GetUsersResponse> => {
  try {
    const response = await api.get("/messages/online-users");
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

// get messages
const getMessages = async (receiverId: string) => {
  try {
    const response = await api.get(`/messages/${receiverId}`);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};
// send message
const sendMessage = async (receiverId: string, formData: FormData) => {
  try {
    const response = await api.post(`/messages/send/${receiverId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { getOnlineUsers, getMessages, sendMessage };
