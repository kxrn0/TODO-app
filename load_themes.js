const root = document.documentElement;
const toggle = document.getElementById("theme-switch");

root.className = "light";

toggle.addEventListener("click", () => {
    if (toggle.checked)
        root.className = "dark";
    else
        root.className = "light";
});