import { BASE_URL } from "../../apiConfig";

export const fetchReports = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/reports/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
