import { BASE_URL } from "../../../Navigation/apiConfig";

export const fetchReports = async (userId, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}api/reports/user?current_user_id=${userId}&page=${page}`);
    const data = await response.json();
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      location: `${item.location} (${item.altitude}, ${item.longitude})`,
      description: item.description,
      status: item.state,
      collected: item.pickedup_by !== null,
      createdAt: new Date(item.created_at), // Assuming you have a `created_at` field
      image: { uri: `${BASE_URL}${item.picture}` },
    }));
  } catch (error) {
    throw error;
  }
};
