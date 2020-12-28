export const generate = (type) => {
    switch (type) {
        case "ulid":
            return generateUlid();
        case "uuid":
            return generateUuid();
        case "unixtime":
            return generateUnixTimeSec();
        case "unixtime_msec":
            return generateUnixTimeMsec();
    }
    return "";
};

const generateUlid = () => {
    return ULID.ulid();
};

const generateUuid = () => {
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
};

const generateUnixTimeSec = () => {
    return Math.floor(generateUnixTimeMsec() / 1000);
};

const generateUnixTimeMsec = () => {
    return Date.now();
};