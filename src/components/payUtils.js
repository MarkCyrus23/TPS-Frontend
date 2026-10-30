export const pad = (n) => String(n).padStart(2, "0");

// "13:00" -> "1:00 PM"
export function to12(t) {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

export const peso = (n) =>
    `₱${Number(n || 0).toLocaleString("en-PH", { maximumFractionDigits: 2 })}`;

// Paliitin ang image at gawing JPEG data URL (para sa receipt at QR)
export function resizeToJpeg(file, max = 1280, quality = 0.85) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const r = Math.min(1, max / Math.max(img.width, img.height));
            const c = document.createElement("canvas");
            c.width = Math.round(img.width * r);
            c.height = Math.round(img.height * r);
            const ctx = c.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, c.width, c.height);
            URL.revokeObjectURL(url);
            resolve(c.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("That image could not be read. Try a JPG or PNG."));
        };
        img.src = url;
    });
}