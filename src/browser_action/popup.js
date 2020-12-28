import {generate} from "./generate.js";

window.addEventListener("load", (event) => {
    document.getElementById("type").focus();
});

window.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        document.getElementById("copy").click();
    }
    return false;
});

document.getElementById("copy").onclick = async () => {
    const selectedType = document.getElementById("type").value;
    const copyText = generate(selectedType);
    await navigator.clipboard.writeText(copyText);
    window.close();
};
