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
  const updateUrl = `${BASE_URL}api/users/update`;

  const payload = {
    id: userId,
    firstName: profileData.FirstName,
    lastName: profileData.LastName,
    username: profileData.Username,
    email: profileData.Email,
    country: profileData.Country,
    password: profileData.mot_de_passe 
  };

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user profile");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
