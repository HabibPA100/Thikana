import axios from "axios";

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Logout failed:", error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};