const BASE = "/api";

export async function sendClientMessage(clientId, { channel, subject, body }) {
    const res = await fetch(`${BASE}/clients/${clientId}/messages`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, subject, body }),
    });
    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data?.message) message = data.message;
        } catch (_) {}
        throw new Error(message);
    }
    return res.status === 204 ? null : res.json();
}