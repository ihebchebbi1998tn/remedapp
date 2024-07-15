import { BASE_URL } from "../../apiConfig";

export const fetchReports = async () => {
  try {
    const response = await fetch(`${BASE_URL}remed/api/reports/getall_report.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
