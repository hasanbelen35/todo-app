// GET API REQUEST
export async function getAPI(endpoint) {
    const res = await fetch(endpoint, { method: "GET" });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
}
// POST API REQUEST
export async function postAPI(endpoint, data) {
    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("API request failed");
    return res.json();
}
// DELETE API REQUEST
export async function deleteAPI(endpoint, id) {
    const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("API delete request failed");
    return res.json();
}
// UPDATE API REQUEST
export async function updateAPI(endpoint, id, newData) {
    const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newData }),
    });
    if (!res.ok) throw new Error("API update request failed");
    return res.json();
}
