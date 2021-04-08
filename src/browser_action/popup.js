import {generate} from "./generate.js";

const TYPES = [
    {text: "ULID", value: "ulid"},
    {text: "UUID(v4)", value: "uuid"},
    {text: "Unixtime", value: "unixtime"},
    {text: "Unixtime(msec)", value: "unixtime_msec"}
];

window.addEventListener("load", () => {
    document.getElementById("type").focus();
    chrome.storage.sync.get("types", (stores) => {
        const selectElement = document.getElementById("type");
        const types = stores.types ?? TYPES.map((t) => t.value);
        for (const type of types) {
            const text = TYPES.find((t) => t.value === type)?.text;
            if (text) {
                selectElement.options[selectElement.options.length] = new Option(text, type);
            }
        }
    });
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
