// HeaderAPI.js
import { BASE_URL } from "../../apiConfig";

export const sendBugReportAPI = async (user, bugDescription) => {
    const { FirstName, LastName, id } = user;
    const subject = 'Bug Report';
    const url = `${BASE_URL}/remed/api/utilisateur/sendbug.php`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: FirstName,
            lastName: LastName,
            id,
            subject,
            message: bugDescription,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to send bug report.');
    }

    return await response.json();
};
