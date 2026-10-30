// API layer para sa Manage Home. Ayusin ang BASE at auth ayon sa backend mo.
const BASE = "/api";

async function request(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        credentials: "include", // gumagamit ng session cookie; palitan ng Authorization header kung JWT
        ...options,
        headers: {
            ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });
    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data?.message) message = data.message;
        } catch (_) { /* walang JSON body */ }
        throw new Error(message);
    }
    return res.status === 204 ? null : res.json();
}

/** GET /api/home-content */
export const getHomeContent = () => request("/home-content");

/** PUT /api/home-content (admin only) */
export const saveHomeContent = (content) =>
    request("/home-content", { method: "PUT", body: JSON.stringify(content) });

/** POST /api/home-content/image (multipart, field "image") -> { url } */
export const uploadHomeImage = (file) => {
    const body = new FormData();
    body.append("image", file);
    return request("/home-content/image", { method: "POST", body });
};