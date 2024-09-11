import { BASE_URL } from "../../../apiConfig";

export const submitReport = async (formData, user, title, description, userCountry, altitude, longitude) => {
  const queryParams = new URLSearchParams({
    reported_by: `${user.FirstName} ${user.LastName}`,
    title,
    description,
    location: userCountry,
    altitude: altitude.toString(),
    longitude: longitude.toString(),
    state: "Pending",
    pickedup_by: "null",
  });

  const response = await fetch(`${BASE_URL}api/reports/create`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.ok) {
    throw new Error('Failed to submit report');
  }

  return response.json();
};

export const submitErrorAI = async (foundTags, falseURL) => {
  const contactUrl = `${BASE_URL}remed/api/utilisateur/Aireport.php`;
  const params = new URLSearchParams({
    ReceivedTags: foundTags.join(","),
    ImageUrl: falseURL,
  }).toString();

  const response = await fetch(`${contactUrl}?${params}`, {
    method: 'GET',
  });

  return response.text();
};
