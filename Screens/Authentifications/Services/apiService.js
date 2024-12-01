import { BASE_URL } from "../../../Navigation/apiConfig";
import i18n from 'i18next';

export const fetchLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error(i18n.t("CredentialsDoNotMatch"));
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const signup = async (userInfo) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo), 
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Error: ${response.status} - ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
  
export const sendOtpCode = async (email, randomCode) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/otpcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, randomCode }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error sending OTP code:", error);
    throw error;
  }
};

  
export const updatePassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/update-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }) // Include email in the body
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

  
