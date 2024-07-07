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
  