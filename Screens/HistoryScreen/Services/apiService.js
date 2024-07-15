import { BASE_URL } from "../../../Navigation/apiConfig";

export const fetchReports = async (userId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${userId}&page=${page}`
    );
    const data = await response.json();
    return data.map((item) => ({
      id: `${item.id}-${item.created_at}`,
      title: item.title,
      location: `${item.location} (${item.altitude}, ${item.longitude})`,
      description: item.description,
      status: item.state,
      collected: item.pickedup_by !== null,
      createdAt: new Date(item.created_at),
      image: { uri: `${BASE_URL}remed/api/reports/` + item.picture },
    }));
  } catch (error) {
    throw error; 
  }
};
