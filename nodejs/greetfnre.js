const name = process.argv[2];
export function sendgreet(hours) {
    if (hours < 4 || hours>=19) return "good Night";
    if (hours <9) return "good Morning";
    if (hours < 16) return "good Afternoon";
    return "good evening";
}

