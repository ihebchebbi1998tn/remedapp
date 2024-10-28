import { BASE_URL } from "../../../Navigation/apiConfig";

export const sendContactMessage = async (contactData) => {
  const contactUrl = `${BASE_URL}api/users/send-email`; 

  try {
    const response = await fetch(contactUrl, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(contactData), 
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send email"); 
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

export const deleteUser = async (userId) => {
  const deleteUrl = `${BASE_URL}api/users/delete/${userId}`;

  try {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete user");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
