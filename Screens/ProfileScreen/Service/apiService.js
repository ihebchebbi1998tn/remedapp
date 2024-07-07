import { BASE_URL } from "../../../Navigation/apiConfig";

export const sendContactMessage = async (contactData) => {
  const contactUrl = `${BASE_URL}remed/api/utilisateur/sendemail.php`;
  
  const params = new URLSearchParams(contactData).toString();
  
  try {
    const response = await fetch(`${contactUrl}?${params}`, { method: "GET" });
    const result = await response.text();
    
    if (!response.ok) {
      throw new Error(result);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProfile = async (userId, profileData) => {
  const updateUrl = `${BASE_URL}remed/api/utilisateur/update_utilisateur.php?id=${userId}`;
  
  const formData = new FormData();
  
  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }
  
  try {
    const response = await fetch(updateUrl, { method: "POST", body: formData });
    const result = await response.text();
    
    if (!response.ok) {
      throw new Error(result);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
