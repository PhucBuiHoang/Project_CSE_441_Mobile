
import { API_BASE_URL } from '../services/api';
export default async function signUp(username, password) {
    const response = await fetch(`${API_BASE_URL}/Auth/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    // Check response status
    if (!response.ok) {
        // Try to parse JSON error message if present
        const errorText = await response.text();
        let errorMessage;
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || "Sign-up failed";
        } catch (e) {
            errorMessage = errorText || "Sign-up failed";
        }
        throw new Error(errorMessage);
    }

    // Handle empty body
    const text = await response.text();
    if (!text) return;

    try {
        return JSON.parse(text); // only if body is valid JSON
    } catch (e) {
        throw new Error("Failed to parse response");
    }
}
