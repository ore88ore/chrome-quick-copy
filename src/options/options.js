let types = [];

window.addEventListener("load", () => {
    chrome.storage.sync.get({
        types: ["ulid", "uuid", "uuidv7", "unixtime", "unixtime_msec", "iso8601_utc", "iso8601_local"]
    }, function (items) {
        types = items.types;
        for (const type of types) {
            document.getElementById(type).checked = true;
        }
    });
    const typeCheckBoxes = document.getElementsByName("types");
    typeCheckBoxes.forEach((typeCheckBox) => {
        typeCheckBox.addEventListener("change", (event) => {
            const checkBox = event.target;
            saveType(checkBox.id, checkBox.checked);
        });
    });
});

const saveType = (id, isChecked) => {
    if (isChecked) {
        types.push(id);
    } else {
        types = types.filter((type) => type !== id);
    }
    chrome.storage.sync.set({
        types: types
    }, () => {
    });
};

