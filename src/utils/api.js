const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export async function get(endpoint) {
    try {
        const url = `${API_BASE}${endpoint}`;
        console.log(`[API] GET request to: ${url}`);
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Request failed");
        return data;
    } catch (err) {
        console.error("API Error:", err);
        const url = `${API_BASE}${endpoint}`;
        if (err.message === "Failed to fetch" || err.message.includes("NetworkError")) {
            throw new Error(`Cannot connect to backend at ${url}. Please ensure the server is running on port 8000.`);
        }
        throw err;
    }
}

export async function post(endpoint, payload, method = "POST") {
    try {
        const url = `${API_BASE}${endpoint}`;
        console.log(`[API] ${method} request to: ${url}`);
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Request failed");
        return data;
    } catch (err) {
        console.error("API Error:", err);
        const url = `${API_BASE}${endpoint}`;
        if (err.message === "Failed to fetch" || err.message.includes("NetworkError")) {
            throw new Error(`Cannot connect to backend at ${url}. Please ensure the server is running on port 8000.`);
        }
        throw err;
    }
}
