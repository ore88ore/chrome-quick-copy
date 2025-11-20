export const generate = (type) => {
    switch (type) {
        case "ulid":
            return generateUlid();
        case "uuid":
            return generateUuid();
        case "uuidv7":
            return generateUuidV7();
        case "unixtime":
            return generateUnixTimeSec();
        case "unixtime_msec":
            return generateUnixTimeMsec();
        case "iso8601_utc":
            return generateIso8601Utc();
        case "iso8601_local":
            return generateIso8601Local();
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

const generateUuidV7 = () => {
    const unixMs = BigInt(Date.now());
    const bytes = getRandomBytes(16);

    const timeLow = Number(unixMs & 0xffffffffn);
    const timeMid = Number((unixMs >> 32n) & 0xffffn);
    const timeHi = Number((unixMs >> 48n) & 0x0fffn);

    bytes[0] = (timeLow >>> 24) & 0xff;
    bytes[1] = (timeLow >>> 16) & 0xff;
    bytes[2] = (timeLow >>> 8) & 0xff;
    bytes[3] = timeLow & 0xff;

    bytes[4] = (timeMid >>> 8) & 0xff;
    bytes[5] = timeMid & 0xff;

    bytes[6] = 0x70 | ((timeHi >>> 8) & 0x0f);
    bytes[7] = timeHi & 0xff;

    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    return bytesToUuid(bytes);
};

const generateUnixTimeSec = () => {
    return Math.floor(generateUnixTimeMsec() / 1000);
};

const generateUnixTimeMsec = () => {
    return Date.now();
};

const generateIso8601Utc = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = padNumber(date.getUTCMonth() + 1);
    const day = padNumber(date.getUTCDate());
    const hours = padNumber(date.getUTCHours());
    const minutes = padNumber(date.getUTCMinutes());
    const seconds = padNumber(date.getUTCSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const generateIso8601Local = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    const seconds = padNumber(date.getSeconds());
    const offsetMinutes = date.getTimezoneOffset();
    const sign = offsetMinutes <= 0 ? "+" : "-";
    const absoluteOffset = Math.abs(offsetMinutes);
    const offsetHours = padNumber(Math.floor(absoluteOffset / 60));
    const offsetRemainMinutes = padNumber(absoluteOffset % 60);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetRemainMinutes}`;
};

const getRandomBytes = (size) => {
    const buffer = new Uint8Array(size);
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        crypto.getRandomValues(buffer);
    } else {
        for (let i = 0; i < size; i++) {
            buffer[i] = Math.floor(Math.random() * 256);
        }
    }
    return buffer;
};

const bytesToUuid = (bytes) => {
    return (
        HEX[bytes[0]] + HEX[bytes[1]] + HEX[bytes[2]] + HEX[bytes[3]] + "-" +
        HEX[bytes[4]] + HEX[bytes[5]] + "-" +
        HEX[bytes[6]] + HEX[bytes[7]] + "-" +
        HEX[bytes[8]] + HEX[bytes[9]] + "-" +
        HEX[bytes[10]] + HEX[bytes[11]] + HEX[bytes[12]] + HEX[bytes[13]] + HEX[bytes[14]] + HEX[bytes[15]]
    );
};

const padNumber = (value) => {
    return value.toString().padStart(2, "0");
};

const HEX = Array.from({length: 256}, (_, index) => index.toString(16).padStart(2, "0"));