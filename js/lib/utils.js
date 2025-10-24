export function formatPrice(n) {
    return Number(n).toFixed(2);
}

export function escapeHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s).replace(/[&<>"']/g, function (m) {
        return { "&": "&", "<": "<", ">": ">", '"': '"', "'": "&#39;" }[m];
    });
}