import Notification from "../notification";

export default class HttpClient {

    static BASE_URL = 'https://pademi.vercel.app/api/v1';
    // Static method to handle errors
    static handleErrors(e: unknown): void {
        if (e instanceof Error) {
            Notification.error(e.message);
        } else {
            Notification.error(JSON.stringify(e));
        }
    }

    // Static method for GET requests
    static async get<T>(endpoint: string): Promise<T | null> {
        try {
            const response = await fetch(`${HttpClient.BASE_URL}${endpoint}`);
            const data: T = await response.json();
            return data;
        } catch (e) {
            this.handleErrors(e);
            return null;
        }
    }

    // Static method for POST requests
    static async post<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
        const requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        try {
            const response = await fetch(`${HttpClient.BASE_URL}${endpoint}`, requestOptions);
            const data: T = await response.json();
            return data;
        } catch (e) {
            this.handleErrors(e);
            return null;
        }
    }

    static async patch<T>(endpoint: string, body: Record<string, unknown>, options: RequestInit = {}): Promise<T | null> {
        const requestOptions: RequestInit = {
            method: 'PATCH',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Include the body for PATCH requests
            ...options,
        };

        try {
            const response = await fetch(`${HttpClient.BASE_URL}${endpoint}`, requestOptions);
            const data: T = await response.json();
            return data;
        } catch (e) {
            this.handleErrors(e);
            return null;
        }
    }

}
