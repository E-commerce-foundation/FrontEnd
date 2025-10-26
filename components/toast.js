import { escapeHtml } from "../js/lib/utils.js";
const toastContainer = document.getElementById("toastContainer");

export default function Toast(message, type = "success", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-message">${escapeHtml(message)}</div>
      <button class="toast-dismiss">x</button>
    `;

    const dismissBtn = toast.querySelector(".toast-dismiss");
    const removeToast = () => {
        toast.classList.remove("show");
        toast.classList.add("hide");
        toast.addEventListener(
            "transitionend",
            () => {
                if (toast.parentElement) toast.remove();
            },
            { once: true }
        );
    };
    dismissBtn.addEventListener("click", removeToast);

    // auto-dismiss
    setTimeout(() => {
        if (toast.parentElement) removeToast();
    }, duration);
    toastContainer.appendChild(toast);
    // show with class-based transition (CSS handles .show/.hide)
    requestAnimationFrame(() => toast.classList.add("show"));
    return toast;
}
