import { BASE_URL } from "../../../Navigation/apiConfig";

export const fetchLogin = async (username, password) => {
  const response = await fetch(`${BASE_URL}remed/api/utilisateur/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

export const signup = async (userInfo) => {
    try {
      const response = await axios.post(`${BASE_URL}remed/api/utilisateur/create_utilisateur.php`, userInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const sendOtpCode = async (email, randomCode) => {
    try {
      const response = await fetch(`${BASE_URL}remed/api/utilisateur/code.php?Email=${email}&CODE=${randomCode}`);
      const textResponse = await response.text();
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Error sending code:", error);
      throw error;
    }
  };
  
  export const updatePassword = async (email, newPassword) => {
    try {
      const response = await fetch(`${BASE_URL}remed/api/utilisateur/updatepassword.php?Email=${email}&Password=${newPassword}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating password:", error.message);
      throw error;
    }
  };
  