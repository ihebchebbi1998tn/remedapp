import { BASE_URL } from "../../apiConfig";

export const sendBugReportAPI = async (user, bugDescription) => {
    const { firstName, lastName, id } = user;  
    const subject = 'Bug Report';  
    const url = `${BASE_URL}api/users/send-bug`; 

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName, 
            lastName, 
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
